const Koa = require('koa');
const _ = require('koa-route');
const app = new Koa();

requestID = 700;

function generateItem() {
  let ret = '';
  for (let i = 0; i < 20; i++) {
    ret += `<li class="">  
      <a href="/content/${ requestID - i }">第 ${ requestID - i } 条新闻</a>    
      <span class="p-fl-time">2019/05/21</span>
    </li>`
  }
  return ret;
}

app.use(_.get('/list', (ctx) => {
  requestID += 1;
  ctx.body = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html lang="zh-hans" dir="ltr" prefix="content: http://purl.org/rss/1.0/modules/content/ dc: http://purl.org/dc/terms/ foaf: http://xmlns.com/foaf/0.1/ og: http://ogp.me/ns# rdfs: http://www.w3.org/2000/01/rdf-schema# sioc: http://rdfs.org/sioc/ns# sioct: http://rdfs.org/sioc/types# skos: http://www.w3.org/2004/02/skos/core# xsd: http://www.w3.org/2001/XMLSchema#">
<head profile="http://www.w3.org/1999/xhtml/vocab">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=9" />
  <meta name=”renderer” content=”webkit” />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta about="/research/activity" typeof="skos:Concept" property="rdfs:label skos:prefLabel" content="学术活动" />
<link rel="canonical" href="http://sdcs.sysu.edu.cn/research/activity" />
<link rel="shortlink" href="http://sdcs.sysu.edu.cn/taxonomy/term/14" />
  <title>学术活动 | 数据科学与计算机学院</title>
  <style>
@import url("http://sdcs.sysu.edu.cn/modules/system/system.base.css?prn61a");
</style>
<style>
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/date/date_api/date.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/date/date_popup/themes/datepicker.1.7.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/date/date_repeat_field/date_repeat_field.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/modules/field/theme/field.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/modules/node/node.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/modules/studyroom_availability/css/studyroom_availability.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/modules/studyroom_hours/studyroom_hours.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/modules/studyroom_reservation/css/studyroom_reservation.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/views/css/views.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/ckeditor/css/ckeditor.css?prn61a");
</style>
<style>
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/ctools/css/ctools.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/taxonomy_access/taxonomy_access.css?prn61a");
</style>
<style>
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/css/bootstrap.min.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/css/style.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/css/overrides.css?prn61a");
</style>
  <!-- HTML5 element support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <script src="http://sdcs.sysu.edu.cn/sites/all/modules/jquery_update/replace/jquery/1.8/jquery.min.js?v=1.8.3"></script>
<script src="http://sdcs.sysu.edu.cn/misc/jquery.once.js?v=1.2"></script>
<script src="http://sdcs.sysu.edu.cn/misc/drupal.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/js/studyroom_date_popup.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/languages/zh-hans_IAIO73u9zVRywEviAUJ23hEcO1FR3ljXybSZyv0ZOgQ.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/scripts/bootstrap.min.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/scripts/jquery-migrate-1.2.1.min.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/scripts/main.js?prn61a"></script>
<script>jQuery.extend(Drupal.settings, {"basePath":"\/","pathPrefix":"","ajaxPageState":{"theme":"sdcs","theme_token":"GisdNrbReN79N9_ck_nukvXN9TpBQXIlayAObbVXIgk","js":{"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/bootstrap\/js\/bootstrap.js":1,"sites\/all\/modules\/jquery_update\/replace\/jquery\/1.8\/jquery.min.js":1,"misc\/jquery.once.js":1,"misc\/drupal.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/js\/studyroom_date_popup.js":1,"public:\/\/languages\/zh-hans_IAIO73u9zVRywEviAUJ23hEcO1FR3ljXybSZyv0ZOgQ.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/scripts\/bootstrap.min.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/scripts\/jquery-migrate-1.2.1.min.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/scripts\/main.js":1},"css":{"modules\/system\/system.base.css":1,"sites\/all\/modules\/date\/date_api\/date.css":1,"sites\/all\/modules\/date\/date_popup\/themes\/datepicker.1.7.css":1,"sites\/all\/modules\/date\/date_repeat_field\/date_repeat_field.css":1,"modules\/field\/theme\/field.css":1,"modules\/node\/node.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/modules\/studyroom_availability\/css\/studyroom_availability.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/modules\/studyroom_hours\/studyroom_hours.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/modules\/studyroom_reservation\/css\/studyroom_reservation.css":1,"sites\/all\/modules\/views\/css\/views.css":1,"sites\/all\/modules\/ckeditor\/css\/ckeditor.css":1,"sites\/all\/modules\/ctools\/css\/ctools.css":1,"sites\/all\/modules\/taxonomy_access\/taxonomy_access.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/css\/bootstrap.min.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/css\/style.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/css\/overrides.css":1}},"urlIsAjaxTrusted":{"\/search\/node":true},"bootstrap":{"anchorsFix":1,"anchorsSmoothScrolling":1,"formHasError":1,"popoverEnabled":1,"popoverOptions":{"animation":1,"html":0,"placement":"right","selector":"","trigger":"click","triggerAutoclose":1,"title":"","content":"","delay":0,"container":"body"},"tooltipEnabled":1,"tooltipOptions":{"animation":1,"html":0,"placement":"auto left","selector":"","trigger":"hover focus","delay":0,"container":"body"}}});</script>
</head>
<body class="html not-front not-logged-in no-sidebars page-taxonomy page-taxonomy-term page-taxonomy-term- page-taxonomy-term-14 i18n-zh-hans navbar-is-static-top" >
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable">跳转到主要内容</a>
  </div>
    <header id="navbar" role="banner" class="navbar navbar-static-top navbar-default header-img">
  <div class="container">
    <div class="navbar-header">
          <div class="region region-header">
    <section id="block-search-form" class="block block-search clearfix">

      
  <form class="form-search content-search" action="/search/node" method="get" id="search-block-form" accept-charset="UTF-8"><div><div class="input-group"><input title="请输入您想搜索的关键词。" placeholder="搜索" class="form-control form-text" type="text" id="edit-search-block-form--2" name="keys" value="" size="15" maxlength="128" /><span class="input-group-btn"><button type="submit" class="btn btn-primary">搜索</button></span></div><div class="form-actions form-wrapper form-group" id="edit-actions"><button class="element-invisible btn btn-primary form-submit" type="submit" id="edit-submit" name="op" value="搜索">搜索</button>
</div></div></form>
</section>
  </div>
                <a class="logo navbar-btn pull-left" href="/" title="首页">
        <img class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/logo.png" alt="首页" />
      </a>
      
      <!--      <a class="name navbar-brand" href="/" title="首页">数据科学与计算机学院</a>
      -->
        <div class="logon-box">
            <a class="log-on" href="http://dpcms8.sysu.edu.cn/sdcs-live1/cas/">登录</a>
            <a class="guideline" href="http://sdcs.sysu.edu.cn/guideline_">办事指南</a>
        </div>
      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>


          <div class="navbar-collapse collapse">
        <nav role="navigation">
                      <ul class="menu nav navbar-nav"><li class="first leaf"><a href="/">首页</a></li>
<li class="expanded dropdown"><a href="/about/introduction" data-target="#" class="dropdown-toggle" data-toggle="dropdown">学院概况 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/about/introduction" title="">学院简介</a></li>
<li class="leaf"><a href="/about/leader">现任领导</a></li>
<li class="leaf"><a href="/about/organization" title="">学术机构</a></li>
<li class="collapsed"><a href="/about/management/1">管理机构</a></li>
<li class="last leaf"><a href="/about/committee" title="">常设委员会</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">人才队伍 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/personnel/teachers" title="">专职师资</a></li>
<li class="leaf"><a href="/personnel/teacher2" title="">专职科研人员</a></li>
<li class="leaf"><a href="/personnel/teacher6" title="">客座教授</a></li>
<li class="leaf"><a href="/personnel/teacher7" title="">企业师资</a></li>
<li class="leaf"><a href="/personnel/recruitment" title="">人才招聘</a></li>
<li class="last collapsed"><a href="/personnel/services" title="">人事服务</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">人才培养 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/train/undergraduate" title="">本科生教育</a></li>
<li class="leaf"><a href="/train/postgraduate" title="">研究生教育</a></li>
<li class="last leaf"><a href="/download" title="">下载中心</a></li>
</ul></li>
<li class="expanded active-trail active dropdown"><a href="#" title="" class="active-trail dropdown-toggle nolink" data-target="#" data-toggle="dropdown">学术科研 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/research/platform">科研平台</a></li>
<li class="leaf"><a href="/research/info" title="">科研信息</a></li>
<li class="leaf active-trail active"><a href="/research/activity" title="" class="active-trail active">学术活动</a></li>
<li class="leaf"><a href="/research/cooperation" title="">国际合作与交流</a></li>
<li class="leaf"><a href="#" title="" class="nolink">学术讲座</a></li>
<li class="last leaf"><a href="/research/team" title="">科研团队</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">学生工作 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/student/league" title="">团学建设</a></li>
<li class="leaf"><a href="/student/notice" title="">学工通知</a></li>
<li class="leaf"><a href="/student/activity" title="">学生活动</a></li>
<li class="last leaf"><a href="/student/style" title="">班级风采</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">党群工作 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first collapsed"><a href="/work/party/1" title="">党建工作</a></li>
<li class="last leaf"><a href="/work/union" title="">工会建设</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">校友之窗 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/alumni/info" title="">校友信息</a></li>
<li class="leaf"><a href="/alumni/service" title="">校友服务</a></li>
<li class="last leaf"><a href="/alumni/contact" title="">联系</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">社会服务 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/society/cooperation" title="">产研合作</a></li>
<li class="leaf"><a href="/society/practice" title="">实习基地</a></li>
<li class="leaf"><a href="/society/trainingbase" title="">实训基地</a></li>
<li class="leaf"><a href="/society/training" title="">专业培训</a></li>
<li class="leaf"><a href="/society/examination" title="">等级考试</a></li>
<li class="leaf"><a href="/society/self" title="">自考实践</a></li>
<li class="last leaf"><a href="/society/ccf" title="">CCF认证</a></li>
</ul></li>
<li class="last expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">招生就业 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/admissions" title="">招生信息</a></li>
<li class="leaf"><a href="/orientation" title="">就业服务</a></li>
<li class="last leaf"><a href="/contact">招聘联系</a></li>
</ul></li>
</ul>                                      </nav>
      </div>
      </div>
</header>

<div class="main-container container">

  <div class="row">

    
    <section class="col-sm-12">
            <ol class="breadcrumb">
<li class="active">测试新闻</li>
</ol>      <a id="main-content"></a>
                          <h1 class="page-header">测试新闻</h1>
                                                                <div class="region region-content">
    <section id="block-system-main" class="block block-system clearfix">

      
  <div class="term-listing-heading"><div id="taxonomy-term-14" class="taxonomy-term vocabulary-tags">

  
  <div class="content">
      </div>

</div>
</div><div class="view view-all-block view-id-all_block view-display-id-page_1 view-dom-id-e231d9dfbc3337bd7a7d2442bf29b3e9">
        
  
  
      <div class="view-content">
      <div class="full-page-list">    <ul>
      ${
        generateItem()
      } 
    
      </ul></div>    </div>
  
      <div class="text-center"><ul class="pagination"><li class="active"><span>1</span></li>
<li><a title="到第 2 页" href="/research/activity?page=1">2</a></li>
<li><a title="到第 3 页" href="/research/activity?page=2">3</a></li>
<li><a title="到第 4 页" href="/research/activity?page=3">4</a></li>
<li><a title="到第 5 页" href="/research/activity?page=4">5</a></li>
<li><a title="到第 6 页" href="/research/activity?page=5">6</a></li>
<li><a title="到第 7 页" href="/research/activity?page=6">7</a></li>
<li><a title="到第 8 页" href="/research/activity?page=7">8</a></li>
<li><a title="到第 9 页" href="/research/activity?page=8">9</a></li>
<li class="next"><a title="去下一个页面" href="/research/activity?page=1">下一页 ›</a></li>
<li class="pager-last"><a title="到最后一页" href="/research/activity?page=9">末页 »</a></li>
</ul></div>  
  
  
  
  
</div>
</section>
  </div>
    </section>

    
  </div>
</div>



<div id="bottom-teaser">
  <div class="main-container">
    <div class="row">
      <footer class="footer container">
          <div class="region region-footer">
    <section id="block-block-1" class="block block-block clearfix">

      
  <div class="col-lg-6 col-md-6"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/logo.png" /><p><a href="">中山大学教务部</a>  |   <a href="">中山大学学生部</a> </p>
<p>地址：广州市广州大学城外环东路132号</p>
<p>邮编：510006</p>
<p>2015-2017 中山大学数据科学与计算机学院 版权所有</p>
</div>
<div class="col-lg-6 col-md-6 footlinks">
<div class="col-lg-6 col-md-6"><a href="http://www.nscc-gz.cn/"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink4.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/eclc" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sdcs-live1/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/footlink8.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/compsci" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink1.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/gdbigdata/" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink5.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/ist" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink3.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://csai.sysu.edu.cn/" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink6.jpg" /></a></div>
</div>

</section>
  </div>

        <div class="clear"></div>
      </footer>
    </div>
  </div>
</div>
  <script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/bootstrap/js/bootstrap.js?prn61a"></script>
</body>
</html>

<!-- Page cached by Boost @ 2019-05-21 09:47:14, expires @ 2019-05-21 10:47:14, lifetime 1 小时 -->
  `
}));

app.use(_.get('/content/:id', (ctx, id) => {
  ctx.body = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
  "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html lang="zh-hans" dir="ltr" prefix="content: http://purl.org/rss/1.0/modules/content/ dc: http://purl.org/dc/terms/ foaf: http://xmlns.com/foaf/0.1/ og: http://ogp.me/ns# rdfs: http://www.w3.org/2000/01/rdf-schema# sioc: http://rdfs.org/sioc/ns# sioct: http://rdfs.org/sioc/types# skos: http://www.w3.org/2004/02/skos/core# xsd: http://www.w3.org/2001/XMLSchema#">
<head profile="http://www.w3.org/1999/xhtml/vocab">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=9" />
  <meta name=”renderer” content=”webkit” />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="报告题目：The Arts of Satisfiability: Algorithms and Complexity 主讲：陈建二， 广州大学， 教授 日期：2019年 5月 17 日（星期五）" />
<link rel="canonical" href="http://sdcs.sysu.edu.cn/content/4816" />
<link rel="shortlink" href="http://sdcs.sysu.edu.cn/node/4816" />
  <title>学术报告：The Arts of Satisfiability: Algorithms and Complexity | 数据科学与计算机学院</title>
  <style>
@import url("http://sdcs.sysu.edu.cn/modules/system/system.base.css?prn61a");
</style>
<style>
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/date/date_api/date.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/date/date_popup/themes/datepicker.1.7.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/date/date_repeat_field/date_repeat_field.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/modules/field/theme/field.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/modules/node/node.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/modules/studyroom_availability/css/studyroom_availability.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/modules/studyroom_hours/studyroom_hours.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/modules/studyroom_reservation/css/studyroom_reservation.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/views/css/views.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/ckeditor/css/ckeditor.css?prn61a");
</style>
<style>
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/ctools/css/ctools.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/all/modules/taxonomy_access/taxonomy_access.css?prn61a");
</style>
<style>
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/css/bootstrap.min.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/css/style.css?prn61a");
@import url("http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/css/overrides.css?prn61a");
</style>
  <!-- HTML5 element support for IE6-8 -->
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <script src="http://sdcs.sysu.edu.cn/sites/all/modules/jquery_update/replace/jquery/1.8/jquery.min.js?v=1.8.3"></script>
<script src="http://sdcs.sysu.edu.cn/misc/jquery.once.js?v=1.2"></script>
<script src="http://sdcs.sysu.edu.cn/misc/drupal.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/modules/studyroom/js/studyroom_date_popup.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/languages/zh-hans_IAIO73u9zVRywEviAUJ23hEcO1FR3ljXybSZyv0ZOgQ.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/scripts/bootstrap.min.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/scripts/jquery-migrate-1.2.1.min.js?prn61a"></script>
<script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/scripts/main.js?prn61a"></script>
<script>jQuery.extend(Drupal.settings, {"basePath":"\/","pathPrefix":"","ajaxPageState":{"theme":"sdcs","theme_token":"JpOz5R5v3pCStDzEgGbuaN9i7bT89_-Jldd0JmG1VCU","js":{"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/bootstrap\/js\/bootstrap.js":1,"sites\/all\/modules\/jquery_update\/replace\/jquery\/1.8\/jquery.min.js":1,"misc\/jquery.once.js":1,"misc\/drupal.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/js\/studyroom_date_popup.js":1,"public:\/\/languages\/zh-hans_IAIO73u9zVRywEviAUJ23hEcO1FR3ljXybSZyv0ZOgQ.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/scripts\/bootstrap.min.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/scripts\/jquery-migrate-1.2.1.min.js":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/scripts\/main.js":1},"css":{"modules\/system\/system.base.css":1,"sites\/all\/modules\/date\/date_api\/date.css":1,"sites\/all\/modules\/date\/date_popup\/themes\/datepicker.1.7.css":1,"sites\/all\/modules\/date\/date_repeat_field\/date_repeat_field.css":1,"modules\/field\/theme\/field.css":1,"modules\/node\/node.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/modules\/studyroom_availability\/css\/studyroom_availability.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/modules\/studyroom_hours\/studyroom_hours.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/modules\/studyroom\/modules\/studyroom_reservation\/css\/studyroom_reservation.css":1,"sites\/all\/modules\/views\/css\/views.css":1,"sites\/all\/modules\/ckeditor\/css\/ckeditor.css":1,"sites\/all\/modules\/ctools\/css\/ctools.css":1,"sites\/all\/modules\/taxonomy_access\/taxonomy_access.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/css\/bootstrap.min.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/css\/style.css":1,"sites\/sdcs.live1.dpcms8.sysu.edu.cn\/themes\/sdcs\/css\/overrides.css":1}},"urlIsAjaxTrusted":{"\/search\/node":true},"bootstrap":{"anchorsFix":1,"anchorsSmoothScrolling":1,"formHasError":1,"popoverEnabled":1,"popoverOptions":{"animation":1,"html":0,"placement":"right","selector":"","trigger":"click","triggerAutoclose":1,"title":"","content":"","delay":0,"container":"body"},"tooltipEnabled":1,"tooltipOptions":{"animation":1,"html":0,"placement":"auto left","selector":"","trigger":"hover focus","delay":0,"container":"body"}}});</script>
</head>
<body class="html not-front not-logged-in no-sidebars page-node page-node- page-node-4816 node-type-article i18n-zh-hans navbar-is-static-top" >
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable">跳转到主要内容</a>
  </div>
    <header id="navbar" role="banner" class="navbar navbar-static-top navbar-default header-img">
  <div class="container">
    <div class="navbar-header">
          <div class="region region-header">
    <section id="block-search-form" class="block block-search clearfix">

      
  <form class="form-search content-search" action="/search/node" method="get" id="search-block-form" accept-charset="UTF-8"><div><div class="input-group"><input title="请输入您想搜索的关键词。" placeholder="搜索" class="form-control form-text" type="text" id="edit-search-block-form--2" name="keys" value="" size="15" maxlength="128" /><span class="input-group-btn"><button type="submit" class="btn btn-primary">搜索</button></span></div><div class="form-actions form-wrapper form-group" id="edit-actions"><button class="element-invisible btn btn-primary form-submit" type="submit" id="edit-submit" name="op" value="搜索">搜索</button>
</div></div></form>
</section>
  </div>
                <a class="logo navbar-btn pull-left" href="/" title="首页">
        <img class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/sdcs/logo.png" alt="首页" />
      </a>
      
      <!--      <a class="name navbar-brand" href="/" title="首页">数据科学与计算机学院</a>
      -->
        <div class="logon-box">
            <a class="log-on" href="http://dpcms8.sysu.edu.cn/sdcs-live1/cas/">登录</a>
            <a class="guideline" href="http://sdcs.sysu.edu.cn/guideline_">办事指南</a>
        </div>
      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>


          <div class="navbar-collapse collapse">
        <nav role="navigation">
                      <ul class="menu nav navbar-nav"><li class="first leaf"><a href="/">首页</a></li>
<li class="expanded dropdown"><a href="/about/introduction" data-target="#" class="dropdown-toggle" data-toggle="dropdown">学院概况 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/about/introduction" title="">学院简介</a></li>
<li class="leaf"><a href="/about/leader">现任领导</a></li>
<li class="leaf"><a href="/about/organization" title="">学术机构</a></li>
<li class="collapsed"><a href="/about/management/1">管理机构</a></li>
<li class="last leaf"><a href="/about/committee" title="">常设委员会</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">人才队伍 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/personnel/teachers" title="">专职师资</a></li>
<li class="leaf"><a href="/personnel/teacher2" title="">专职科研人员</a></li>
<li class="leaf"><a href="/personnel/teacher6" title="">客座教授</a></li>
<li class="leaf"><a href="/personnel/teacher7" title="">企业师资</a></li>
<li class="leaf"><a href="/personnel/recruitment" title="">人才招聘</a></li>
<li class="last collapsed"><a href="/personnel/services" title="">人事服务</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">人才培养 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/train/undergraduate" title="">本科生教育</a></li>
<li class="leaf"><a href="/train/postgraduate" title="">研究生教育</a></li>
<li class="last leaf"><a href="/download" title="">下载中心</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">学术科研 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/research/platform">科研平台</a></li>
<li class="leaf"><a href="/research/info" title="">科研信息</a></li>
<li class="leaf"><a href="/research/activity" title="">学术活动</a></li>
<li class="leaf"><a href="/research/cooperation" title="">国际合作与交流</a></li>
<li class="leaf"><a href="#" title="" class="nolink">学术讲座</a></li>
<li class="last leaf"><a href="/research/team" title="">科研团队</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">学生工作 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/student/league" title="">团学建设</a></li>
<li class="leaf"><a href="/student/notice" title="">学工通知</a></li>
<li class="leaf"><a href="/student/activity" title="">学生活动</a></li>
<li class="last leaf"><a href="/student/style" title="">班级风采</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">党群工作 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first collapsed"><a href="/work/party/1" title="">党建工作</a></li>
<li class="last leaf"><a href="/work/union" title="">工会建设</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">校友之窗 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/alumni/info" title="">校友信息</a></li>
<li class="leaf"><a href="/alumni/service" title="">校友服务</a></li>
<li class="last leaf"><a href="/alumni/contact" title="">联系</a></li>
</ul></li>
<li class="expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">社会服务 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/society/cooperation" title="">产研合作</a></li>
<li class="leaf"><a href="/society/practice" title="">实习基地</a></li>
<li class="leaf"><a href="/society/trainingbase" title="">实训基地</a></li>
<li class="leaf"><a href="/society/training" title="">专业培训</a></li>
<li class="leaf"><a href="/society/examination" title="">等级考试</a></li>
<li class="leaf"><a href="/society/self" title="">自考实践</a></li>
<li class="last leaf"><a href="/society/ccf" title="">CCF认证</a></li>
</ul></li>
<li class="last expanded dropdown"><a href="#" title="" data-target="#" class="dropdown-toggle nolink" data-toggle="dropdown">招生就业 <span class="caret"></span></a><ul class="dropdown-menu"><li class="first leaf"><a href="/admissions" title="">招生信息</a></li>
<li class="leaf"><a href="/orientation" title="">就业服务</a></li>
<li class="last leaf"><a href="/contact">招聘联系</a></li>
</ul></li>
</ul>                                      </nav>
      </div>
      </div>
</header>

<div class="main-container container">

  <div class="row">

    
    <section class="col-sm-12">
            <ol class="breadcrumb"><li><a href="/taxonomy/term/12">测试新闻</a></li>
<li class="active">第 ${ id } 条新闻</li>
</ol>      <a id="main-content"></a>
                          <h1 class="page-header">第 ${ id } 条新闻</h1>
                                                                <div class="region region-content">
    <section id="block-system-main" class="block block-system clearfix">

      
  <div id="node-4816" class="node node-article clearfix" about="/content/4816" typeof="sioc:Item foaf:Document">

  
      <span property="dc:title" content="第 ${ id } 条新闻" class="rdf-meta element-hidden"></span>
  
  <div class="content">
    <span class="submitted-by">作者： 徐瑛　发布时间：2019/05/21　浏览数：96</span><div class="field field-name-body field-type-text-with-summary field-label-hidden"><div class="field-items"><div class="field-item even" property="content:encoded">
    第 ${ id } 条新闻
    <p>为学习贯彻习近平新时代中国特色社会主义思想和党的十九大精神，贯彻落实团的十八大精神和全面从严治团新要求，深化共青团改革，让基层团组织充满活力，发挥团组织在立德树人中的积极作用，根据《共青团中山大学委员会关于开展中山大学2018-2019年度共青团评优工作的通知》要求，我院团委决定开展2018—2019年度共青团评优工作。现将有关事项通知如下：</p>
    <p><strong>一、申报项目和条件</strong></p>
    <p>（一）中山大学优秀共青团员、优秀共青团干部、优秀团支部书记、五四红旗团支部</p>
    <p>1. 中山大学优秀共青团员</p>
    <p>（1）团龄在1年以上（截至2019年4月30日），并在广东智慧团建系统完成团员向组织报到，自觉遵守团的章程，模范履行团员的各项义务，在广东智慧团建系统上没有拖欠团费的记录，积极参加“三会两制一课”和团的活动，在2018年度团员教育评议中获得优秀等次。</p>
    <p>（2）学习成绩优秀，能够在团员青年中发挥模范带头作用，综合测评成绩排名本专业30％以内；大一年级参考第一学期绩点排名，大二及以上年级参考上学年综合测评排名，研究生在读期间无挂科记录。</p>
    <p>（3）在广东志愿者信息管理服务平台（“i志愿”系统）注册成为志愿者，有志愿服务时长记录，经常性参加志愿服务。</p>
    <p>（4）各团支部的推荐名额为本团支部团员总数的5％，按照四舍五入计算，不足一名的按一名计算）。</p>
    <p>注：保留团籍的党员可参与评选。</p>
    <p>2.中山大学优秀共青团干部</p>
    <p>（1）理想信念坚定。认真学习宣传贯彻习近平新时代中国特色社会主义思想和党的十九大精神，在思想上、政治上、行动上始终与以习近平同志为核心的党中央保持高度一致，牢固树立“四个意识”，坚定“四个自信”，坚决做到“两个维护”。</p>
    <p>（2）工作能力过硬。在团的工作岗位上勤奋工作，认真履行岗位职责，积极推进各级团组织的重点工作任务，思路开拓，工作务实；密切联系青年，积极开展直接联系青年工作；竭诚服务青年，在建设服务型团组织工作中脚踏实地、真抓实干、成绩突出。</p>
    <p>（3）工作作风优良。自觉加强党性锻炼、提升党性修养，严格遵守政治纪律和政治规矩，带头践行“三严三实”要求，认真参加“两学一做”学习教育，求真务实，克己奉公，廉洁自律，严格落实中央八项规定精神，坚决反对“四风”。</p>
    <p>（4）在广东志愿者信息管理服务平台（“i志愿”系统）注册成为志愿者，有志愿服务时长记录，经常性参加志愿服务。</p>
    <p>（5）现职团干部，截至2019年4月30日，从事团的工作累计不少于半年。作为保留团籍的团员，在广东智慧团建系统完成团员向组织报到，并在系统上没有拖欠团费的记录；作为团干部，已入驻广东智慧团建系统团干部移动端（广东共青团微信企业号）并向组织报到；团员在线报到全面完成；</p>
    <p>（6）校级优秀团干将从各支部推荐的共青团干部（只包括团支部书记、组织委员、宣传委员和实践委员）以及院级学生组织副部长级（含副部长）以上同学中选出，各团支部可推荐1名本支部团干。</p>
    <p>注：根据校团委分配的名额，我院总共可推荐22位同学参与此项评选。学院将在团支部推选团干及学生组织推荐团干中进行二次审查后决定推荐参评校级优秀共青团干部名单。</p>
    <p>3.中山大学优秀团支部书记</p>
    <p>（1）具备“中山大学优秀共青团干部”所有申报条件。</p>
    <p>（2）团支部团干部入驻团干部移动端并报到、团员在线报到全面完成，连续5-6个月未缴纳团费团员比低于1%（截止到2019年4月30日）。</p>
    <p>（3）截至2019年4月30日，任团支部书记半年以上，学习成绩优良，综合测评成绩排名本专业30％以内。大一年级参考第一学期绩点排名，大二级以上年级参考上学年综合测评排名，研究生在读期间无挂科记录。</p>
    <p>（4）各团支部的推荐名额至多为1名。根据校团委分配的名额，我院总共可推荐11位同学参与此项评选。对于所有提交此项申请的团支书，按照本团支部得分高低，选取前11位推荐到学校。</p>
    <p>4.中山大学五四红旗团支部</p>
    <p>（1）团干部入驻团干部移动端并报到、团员在线报到全面完成，连续5-6个月未缴纳团费团员比低于1%（截止到2019年4月30日）。</p>
    <p>（2）符合上述要求的团支部均可提交申请。根据校团委分配的名额，我院总共可以向学校推荐11个团支部。对于提交此项申请的团支部，按照本团支部得分高低，选取前11个推荐给学校。</p>
    <p>（二）数据科学与计算机学院优秀共青团员、优秀共青团干部、五四红旗团支部、优秀团支部书记</p>
    <p>1.数据科学与计算机学院优秀共青团员</p>
    <p>（1）团龄在1年以上（截至2019年4月30日），并在广东智慧团建系统完成团员向组织报到，自觉遵守团的章程，模范履行团员的各项义务，在广东智慧团建系统上没有拖欠团费的记录。</p>
    <p>（2）综合测评成绩排名本专业50％以内。大一年级参考第一学期绩点排名，大二级以上年级参考上学年综合测评排名，研究生在读期间无挂科记录。</p>
    <p>（3）在广东志愿者信息管理服务平台（“i志愿”系统）注册成为志愿者，有志愿服务时长记录。</p>
    <p>（4）各团支部的推荐名额为本团支部团员总数的5％，按照四舍五入计算，不足一名的按一名计算）。</p>
    <p>注：保留团籍的党员可参与评选。</p>
    <p>2.数据科学与计算机学院优秀共青团干部</p>
    <p>在各团支部推荐的校级优秀共青团干部中，对于未获评“中山大学优秀共青团干部”的团干部，授予“数据科学与计算机学院优秀共青团干部”称号。</p>
    <p>3.数据科学与计算机学院五四红旗团支部</p>
    <p>按照各团支部得分高低，顺延选取前14个未获评“中山大学五四红旗团支部”的团支部，授予“数据科学与计算机学院五四红旗团支部”称号。</p>
    <p>4. 数据科学与计算机学院优秀团支部书记</p>
    <p>按照各团支部得分高低，顺延选取前14位未获评“中山大学优秀团支部书记”的团支书，授予“数据科学与计算机学院优秀团支部书记”称号。</p>
    <p><strong>二、评优工作要求</strong></p>
    <p>1.各团支部在评优过程中要坚持实事求是、公平公开的原则。请如实按名额比例推选，严肃认真，注意听取本支部成员的意见。推荐上报的人选要经过严格审核，由团支部委员会推荐建议名单提交支部团员大会集体讨论决定，确保推荐质量，并在本支部进行不少于2日的公示。</p>
    <p>2.各团支部要高度重视此次评选表彰工作，规范申报程序，履行审核职责，对推荐人员和单位进行材料真实性和思想表现的严格审核。</p>
    <p>3.各团支部要注意挖掘和树立典型。把这次评选表彰工作，作为加强团干部和团员队伍建设的有效载体。通过推荐评选，发现典型，总结经验，表彰先进，推动本支部建设。</p>
    <p>4.个人不可重复参评，即校院级评优不可重复参评，团员团干不可同时参评。</p>
    <p><strong>三、材料提交要求</strong></p>
    <p>1.【格式要求】：申报的书面材料标题一律采用黑体三号字，正文部分采用宋体四号字，24磅行距；表格正文部分一律采用宋体五号字，单倍行距，同时不改变表格原有页面布局。</p>
    <p>2.【提交方式】：请将所有文件名补充完整后，于5月2日23:59前将2018-2019年度五四红评工作包中的XX级XX专业XX班五四红评材料压缩包发给与您对接的组织部干事！</p>
    <p>3. 超过截止日期上交或命名格式不规范的视为无效文件，将不纳入红评范围。</p>
    <p>4. 其他相关事宜<strong>请各团支书留意“计算机学院2018-2019团支书”QQ群（群号：927743099）中的通知。</strong></p>
    <p> </p>
    <p>2018-2019年度五四红评表彰大会预计将于5月第二周举办（具体时间地点待通知）。</p>
    <p> </p>
    <p class="rteright">数据科学与计算机学院团委</p>
    <p class="rteright">2019年4月26日</p>
</div></div></div>  </div>

  
  
</div>

</section>
  </div>
    </section>

    
  </div>
</div>



<div id="bottom-teaser">
  <div class="main-container">
    <div class="row">
      <footer class="footer container">
          <div class="region region-footer">
    <section id="block-block-1" class="block block-block clearfix">

      
  <div class="col-lg-6 col-md-6"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/logo.png" /><p><a href="">中山大学教务部</a>  |   <a href="">中山大学学生部</a> </p>
<p>地址：广州市广州大学城外环东路132号</p>
<p>邮编：510006</p>
<p>2015-2017 中山大学数据科学与计算机学院 版权所有</p>
</div>
<div class="col-lg-6 col-md-6 footlinks">
<div class="col-lg-6 col-md-6"><a href="http://www.nscc-gz.cn/"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink4.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/eclc" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sdcs-live1/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/footlink8.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/compsci" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink1.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/gdbigdata/" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink5.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://sdcs.sysu.edu.cn/ist" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink3.jpg" /></a></div>
<div class="col-lg-6 col-md-6"><a href="http://csai.sysu.edu.cn/" target="_blank"><img alt="" class="img-responsive" src="http://sdcs.sysu.edu.cn/sites/sdcs.sysu.edu.cn/themes/sdcs/images/footlink6.jpg" /></a></div>
</div>

</section>
  </div>

        <div class="clear"></div>
      </footer>
    </div>
  </div>
</div>
  <script src="http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/themes/bootstrap/js/bootstrap.js?prn61a"></script>
</body>
</html>

<!-- Page cached by Boost @ 2019-05-21 09:51:58, expires @ 2019-05-21 10:51:58, lifetime 1 小时 -->`
}))

app.listen(3000);