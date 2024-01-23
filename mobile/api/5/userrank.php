<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 * 
 * This is NOT a freeware, use is subject to license terms
 *
 *      User Rank API
 */
if (!defined('IN_MOBILE_API')) {
    exit('Access Denied');
}

$_GET['mod'] = 'ranklist';
include_once 'misc.php';

class mobile_api {

    function common() {
    }

    function output() {
        global $_G;
        $variable = array();

        $query = DB::query("SELECT uid, username, credits FROM ".DB::table('common_member')." ORDER BY credits DESC LIMIT 10");

        while($user = DB::fetch($query)) {
            $user['avatar'] = $_G['siteurl']. avatar($user['uid'], 'middle', true);
            $variable['rankusers'][] = $user;
        }

        mobile_core::result(mobile_core::variable($variable));
    }

}

?>