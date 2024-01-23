<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: sub_threadlist.php 35068 2014-11-04 02:37:45Z nemohou $
 */

if (!defined('IN_MOBILE_API')) {
	exit('Access Denied');
}


$_G['wechat']['setting'] = unserialize($_G['setting']['mobilewechat']);

$tids = array();
foreach ($_G['forum_threadlist'] as $k => $thread) {
	$tids[] = $_G['forum_threadlist'][$k]['tid'] = $thread['icontid'];


	//获取message和附件
	$post = array_pop(C::t('forum_post')->fetch_all_by_tid('tid:' . $thread['tid'], $thread['tid'], true, '', 0, 0, 1));
	$attachlist = C::t('forum_attachment_n')->fetch_all_by_id('tid:' . $thread['tid'], 'pid', $post['pid']);

	foreach ($attachlist as $aid => $attach) {
		if ($attach['remote']) {
			$attach['attachment'] = $_G['setting']['ftp']['attachurl'] . 'forum/' . $attach['attachment'];
		} else {
			$attach['attachment'] = strpos($_G['setting']['attachurl'], 'http') !== false ? $_G['setting']['attachurl'] . 'forum/' . $attach['attachment'] : $_G['siteurl'] . $_G['setting']['attachurl'] . 'forum/' . $attach['attachment'];
		}

		$attach['thumb'] = mobile_core::thumb($attach['aid'], '0', '268', '380');
		$type = '';
		$fileext = addslashes(strtolower(substr(strrchr($attach['filename'], '.'), 1, 10)));
		if (in_array($fileext, array('jpg', 'jpeg', 'gif', 'png', 'bmp'))) {
			$type = 'image';
		} elseif ($fileext === 'mp3') {
			$type = 'audio';
		} elseif ($fileext === 'mp4') {
			$type = 'video';
		}
		$attach['type'] = $type;
		$attachlist[$aid] = $attach;
	}

	$_G['forum_threadlist'][$k]['attachlist'] = array_values($attachlist);


	$_G['forum_threadlist'][$k]['cover'] = array();
	if ($thread['cover']) {
		$_G['forum_threadlist'][$k]['cover'] = array('w' => 200, 'h' => 200);
	}

	$_G['forum_threadlist'][$k]['reply'] = array();
	if (!isset($_G['wechat']['setting']['wechat_forumdisplay_reply']) || $_G['wechat']['setting']['wechat_forumdisplay_reply']) {
		$key = C::t('#mobile#mobile_wsq_threadlist')->fetch($thread['tid']);
		if ($key['svalue']) {
			$_G['forum_threadlist'][$k]['reply'] = dunserialize($key['svalue']);
		}
	}
	$_G['forum_threadlist'][$k]['dateline'] = strip_tags($thread['dateline']);
	$_G['forum_threadlist'][$k]['lastpost'] = strip_tags($thread['lastpost']);
	if (!$thread['authorid'] || !$thread['author']) {
		$_G['forum_threadlist'][$k]['author'] = $_G['setting']['anonymoustext'];
		$_G['forum_threadlist'][$k]['authorid'] = 0;
	}

	//avatar
	$_G['forum_threadlist'][$k]['avatar'] = $_G['siteurl'] .avatar($thread['authorid'], 'small', true);

	$userids[] = $thread['authorid'];
	// 添加简介信息 

	require_once('source/function/function_discuzcode.php');
	// 移除 [attach] 和一些格式化标签
	$post['message'] = preg_replace('/\[attach\].*?\[\/attach\]/i', '', $post['message']);
	$post['message'] = preg_replace('/\[(color|backcolor|font)=.*?\].*?\[\/(color|backcolor|font)\]/i', '', $post['message']);

	// 初始化 vids 数组
	$vids = [];

	// 匹配 [media] 标签并处理
	$post['message'] = preg_replace_callback('/\[media[^\]]*\](.*?)\[\/media\]/i', function ($matches) use (&$vids) {
		// 检查是否是腾讯视频链接并提取视频 ID
		if (preg_match('/https?:\/\/v\.qq\.com\/x\/page\/([a-z0-9]+)\.html/i', $matches[1], $vidMatches)) {
			$vids[] = $vidMatches[1];
		}
		return '';

	}, $post['message']);

	// 如果有视频 ID，将其添加到 threadlist 中
	if (!empty($vids)) {
		$_G['forum_threadlist'][$k]['vids'] = $vids;
	}

	// 移除额外的空格和换行
	$post['message'] = preg_replace('/ +/', ' ', $post['message']);
	$post['message'] = preg_replace('/(\r\n)+/', "\r\n", $post['message']);

	// 调用 discuzcode 函数
	$message = discuzcode($post['message'], 0, 0, 0, 1, 1, 0, 1);
	$summary = strip_tags($message);

	// 移除连续的空白字符（包括空格和换行）
	$summary = preg_replace('/\s+/', ' ', $summary);
	// 调用 discuzcode 函数
	$message = discuzcode($post['message'], 0, 0, 0, 1, 1, 0, 1);
	$summary = strip_tags($message);

	$summary = mb_substr($summary, 0, 120);



	// 移除前后的空白字符
	$summary = trim($summary);

	if (preg_match('/^[\r\n]+$/', $summary)) {
		$summary = ''; // 如果摘要只包含换行，设置为空字符串
	}
	$_G['forum_threadlist'][$k]['summary'] = $summary;
}

foreach (C::t('common_member')->fetch_all($userids) as $user) {
	$groupiconIds[$user['uid']] = mobile_core::usergroupIconId($user['groupid']);
}

if ($_G['uid']) {
	$memberrecommends = array();
	$query = DB::query('SELECT * FROM %t WHERE recommenduid=%d AND tid IN (%n)', array('forum_memberrecommend', $_G['uid'], $tids));
	while ($memberrecommend = DB::fetch($query)) {
		$memberrecommends[$memberrecommend['tid']] = 1;
	}
	foreach ($_G['forum_threadlist'] as $k => $thread) {
		$_G['forum_threadlist'][$k]['recommend'] = isset($memberrecommends[$thread['icontid']]) ? 1 : 0;
	}
}

foreach ($GLOBALS['sublist'] as $k => $sublist) {
	if ($sublist['icon']) {
		$icon = preg_match('/src="(.+?)"/', $sublist['icon'], $r) ? $r[1] : '';
		if (!preg_match('/^http:\//', $icon)) {
			$icon = $_G['siteurl'] . $icon;
		}
		$GLOBALS['sublist'][$k]['icon'] = $icon;
	}
}

if ($_G['forum']['icon']) {
	require_once libfile('function/forumlist');
	if (strncasecmp($_G['forum']['icon'], 'http://', 7) !== 0) {
		$_G['forum']['icon'] = get_forumimg($_G['forum']['icon']);
		if (strncasecmp($_G['forum']['icon'], 'http://', 7) !== 0) {
			$_G['forum']['icon'] = $_G['siteurl'] . $_G['forum']['icon'];
		}
	}
}
// 帮助函数：获取分页数据
function get_paged_data($array, $page, $pageSize)
{
	$total = count($array);
	$start = ($page - 1) * $pageSize;
	return array_slice($array, $start, $pageSize);
}
$_G['forum']['threadcount'] = $_G['forum_threadcount'];
$_G['forum']['favorited'] = $_G['uid'] && C::t('home_favorite')->fetch_by_id_idtype($_G['forum']['fid'], 'fid', $_G['uid']) ? 1 : 0;

$variable = array(
	'forum' => mobile_core::getvalues($_G['forum'], array('fid', 'fup', 'name', 'threads', 'posts', 'rules', 'autoclose', 'password', 'icon', 'threadcount', 'picstyle', 'description', 'livetid', 'rank', 'allowspecialonly', 'favorited', 'price', 'paycredits', 'threadmodcount', 'todayposts')),
	'group' => mobile_core::getvalues($_G['group'], array('groupid', 'grouptitle', 'allowpostpoll', 'allowpostactivity', 'allowpostdebate')),
	'forum_threadlist' => mobile_core::getvalues(array_values($_G['forum_threadlist']), array('/^\d+$/'), array('tid', 'fid', 'author', 'special', 'authorid', 'subject', 'subject', 'dbdateline', 'dateline', 'dblastpost', 'lastpost', 'lastposter', 'attachment', 'replies', 'readperm', 'views', 'digest', 'cover', 'recommend', 'recommend_add', 'reply', 'avatar', 'displayorder', 'coverpath', 'typeid', 'rushreply', 'replycredit', 'price', 'attachlist')),
	'groupiconid' => $groupiconIds,
	'sublist' => mobile_core::getvalues($GLOBALS['sublist'], array('/^\d+$/'), array('fid', 'name', 'threads', 'todayposts', 'posts', 'icon')),
	'tpp' => $_G['tpp'],
	'page' => $GLOBALS['page'],
	'reward_unit' => $_G['setting']['extcredits'][$_G['setting']['creditstransextra'][2]]['unit'] . $_G['setting']['extcredits'][$_G['setting']['creditstransextra'][2]]['title'],
	'activity_setting' => array(
		'activityfield' => unserialize($_G['setting']['activityfield']),
		'activitytype' =>  explode("\r\n", $_G['setting']['activitytype'])
	)
);
if (!empty($_G['forum']['threadtypes']) || !empty($_GET['debug'])) {
	$variable['threadtypes'] = $_G['forum']['threadtypes'];
}
if (!empty($_G['forum']['threadsorts']) || !empty($_GET['debug'])) {
	$variable['threadsorts'] = $_G['forum']['threadsorts'];
}
// 分离置顶帖和普通帖
$top_threadlist = $normal_threadlist = array();
foreach ($_G['forum_threadlist'] as $thread) {
	if ($thread['displayorder'] > 0) {
		$top_threadlist[] = $thread;
	} else {
		$normal_threadlist[] = $thread;
	}
}

// 分页处理
$page = intval($_GET['page']) > 0 ? intval($_GET['page']) : 1;
$pageSize = intval($_G['tpp']);
$paged_normal_threadlist = get_paged_data($normal_threadlist, $page, $pageSize);

// 更新 $variable 数组
$variable['forum_threadlist'] = mobile_core::getvalues($paged_normal_threadlist, array('/^\d+$/'), array(/* 线程字段列表 */));
$variable['top_threadlist'] = mobile_core::getvalues($top_threadlist, array('/^\d+$/'), array(/* 线程字段列表 */));

$variable['forum']['password'] = $variable['forum']['password'] ? '1' : '0';
