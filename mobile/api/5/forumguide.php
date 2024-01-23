<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: hotthread.php 34314 2014-02-20 01:04:24Z nemohou $
 */

if (!defined('IN_MOBILE_API')) {
	exit('Access Denied');
}
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$_GET['mod'] = 'guide';
$_GET['view'] = isset($_GET['view']) ? $_GET['view'] : 'hot';
$_G['perpage'] = isset($_GET['perpage']) ? intval($_GET['perpage']) : 10;

include_once 'forum.php';

class mobile_api
{

	function common()
	{
	}

	function output()
	{
		global $_G;

		foreach ($GLOBALS['data'][$_GET['view']]['threadlist'] as $tid => $thread) {
			if ($thread['displayorder'] > 0) {
				// 处理置顶帖子
				$topThreads[$tid] = $thread;
			}

			//获取message和附件
			$post = array_pop(C::t('forum_post')->fetch_all_by_tid('tid:' . $thread['tid'], $thread['tid'], true, '', 0, 0, 1));
			$attachlist = C::t('forum_attachment_n')->fetch_all_by_id('tid:' . $thread['tid'], 'pid', $post['pid']);
			$videoList = []; // 初始化 video 数组
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
				if ($attach['type'] == 'video') {
                    $videoList[] = [
                        'thumb' => $attach['thumb'],
                        'attachment' => $attach['attachment']
                    ];
                }

                $attachlist[$aid] = $attach;
			}
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
				$GLOBALS['data'][$_GET['view']]['threadlist'][$tid]['vids'] = $vids;
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


			$GLOBALS['data'][$_GET['view']]['threadlist'][$tid]['summary'] = $summary;


			// 为 threadlist 添加 videoList 数组
            if (!empty($videoList)) {
                $GLOBALS['data'][$_GET['view']]['threadlist'][$tid]['videoList'] = $videoList;
            }

			$GLOBALS['data'][$_GET['view']]['threadlist'][$tid]['attachlist'] = array_values($attachlist);

			$GLOBALS['data'][$_GET['view']]['threadlist'][$tid]['avatar'] = $_G['siteurl'] . avatar($thread['authorid'], 'middle', true);
		}

		$GLOBALS['data'][$_GET['view']]['threadlist'] = $GLOBALS['data'][$_GET['view']]['threadlist'] ? $GLOBALS['data'][$_GET['view']]['threadlist'] : array();

		$variable = array(
			'top_threads' => array_values($topThreads),
			'data' => array_values($GLOBALS['data'][$_GET['view']]['threadlist']),
			'perpage' => $GLOBALS['perpage'],
		);
		mobile_core::result(mobile_core::variable($variable));
	}
}
