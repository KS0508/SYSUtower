# !/usr/bin/python
# -*- coding: UTF-8 -*-
from flask import Flask
import sqlite3


data = sqlite3.connect('test.db')
c = data.cursor()
c = data.cursor()
# 删除原先的数据库
c.execute('DROP TABLE IF EXISTS SOURCE')
c.execute('DROP TABLE IF EXISTS NEWS')
c.execute('DROP TABLE IF EXISTS ATTACHMENT')

# 创建并完善 SOURCE 数据库
c.execute('''CREATE TABLE IF NOT EXISTS SOURCE
        (
            source_id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_department_name TEXT NOT NULL,
            source_sub_name TEXT NOT NULL,
            source_type TEXT NOT NULL,
            source_address TEXT NOT NULL
        );
''')

c.execute('INSERT INTO SOURCE (source_department_name, source_sub_name, source_type, source_address) VALUES("通知", "教务部", "test", "test");')
c.execute('INSERT INTO SOURCE (source_department_name, source_sub_name, source_type, source_address) VALUES("本科生教务", "SDCS", "test", "test");')

# data.commit()

# 创建并完善 NEWS 数据库
c.execute('''CREATE TABLE IF NOT EXISTS NEWS
        (
            news_id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_id INT NOT NULL,
            subscription_id INT NOT NULL,
            news_title TEXT NOT NULL,
            news_text TEXT NOT NULL,
            publish_date TEXT NOT NULL,
            fetch_time TEXT NOT NULL,
            is_bookmarked INT NOT NULL,
            news_keyword TEXT NOT NULL,
            news_abstract TEXT NOT NULL,
            news_address TEXT NOT NULL
        );
''')

c.execute('INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(1, 0, "教务部关于做好2019届本科毕业论文答辩和校级优秀毕业论文评选工作的通知", "test", "2019-05-16", "2019-05-16 10:24:31", 0, "毕业论文答辩，校级优秀毕业论文评选，本科，2019届", "各学院、直属系：\n本科生毕业论文（含毕业设计，下同）是本科教学阶段培养学生综合素质与创新、实践能力的重要环节，是对学生本科学习阶段最重要的一次综合考察。根据《中山大学本科生毕业论文的有关规定》和《教务部关于加强2019届本科生毕业论文（设计）管理工作的通知》（教务〔2019〕98号），并做好校级优秀毕业论文评选推荐工作，现将有关事项通知如下：", "http://jwb.sysu.edu.cn/content/47068");')
s = '''<p>&nbsp;</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 教务〔2019〕100号</p>\n<p>&nbsp;</p>\n<p>各学院、直属系：</p>\n<p>根据《中山大学关于组织开展2019年本科专业培养方案制订与修订工作的通知》（教务〔2019〕66号）精神，2019年本科专业培养方案制订工作已进入学校审议阶段，形式审核通过的培养方案均已送校外专家进行通讯评审。现定于<strong>2019</strong><strong>年</strong><strong>5</strong><strong>月</strong><strong>13</strong><strong>日（周一）</strong>召开答辩会，对本科专业培养方案制订事宜进行分组审议，请各学院（系）按要求组织参会。</p>\n<p>一、答辩范围</p>\n<p>原则上，2019年招生的本科专业均需制定培养方案并参加答辩。按照2019年本科招生专业目录，根据学科情况分八组进行答辩，具体安排见附件1。</p>\n<p>二、答辩要求</p>\n<p>（一）院（系）参会人员</p>\n<p>各院（系）主管教学负责人、专业负责人、本科教学秘书（教务员）。</p>\n<p>（二）答辩方式</p>\n<p>各院（系）主管教学负责人对本单位的本科专业人才培养方案进行整体介绍和答辩，各专业负责人可进行必要的补充。</p>\n<p>（三）答辩时间和内容</p>\n<p><strong>1.</strong><strong>答辩时间安排。</strong>根据各院（系）办学情况以及答辩专业数量不同，陈述环节控制在20-30分钟左右（统一使用PPT汇报），剩余时间为现场互动时间。培养方案答辩的时间安排见附件1，请各院（系）答辩人员提前20分钟到场。</p>\n<p><strong>2.</strong><strong>陈述内容。</strong>陈述内容应严格以各院系向教务部提交的2019级本科人才培养方案为依据，主要包括2019级本科培养方案制订的整体思路和框架等，具体可参考本通知附件2。</p>\n<p><strong>三、答辩材料</strong></p>\n<p>（一）2019级本科人才培养方案及论证报告。现场评委审核将参考各院系提交的培养方案，请务必于<strong>5月8日12:00前</strong>提交2019级本科人才培养方案及论证报告（<strong>纸质版一式八份，同时电子版发送至<a href=\\"mailto:jwbjhk@mail.sysu.edu.cn\\">jwbjhk@mail.sysu.edu.cn</a></strong>），并在提交前仔细做培养方案形式审查，具体可参照形式审查要点对照自查（附件3），对于因形式原因未能通过答辩的，责任由院系自负。</p>\n<p>（二）答辩PPT。请各院（系）务必在<strong>5</strong><strong>月</strong><strong>10</strong><strong>日</strong><strong>12:00</strong><strong>前</strong>，将汇报用PPT电子版以及答辩回执报送教务部。PPT名称统一采用“xx学院（系）-x（个数）专业”形式命名，例如：中国语言文学系-1个专业。</p>\n<p>四、后续工作安排</p>\n<p>答辩完成后，教务部会将校内专家意见和校外通讯评审专家意见一并反馈至各院系，请各院系严格对照修改，并将修改后的培养方案以及修改说明提交教务部，以备二次审核。</p>\n<p>五、其他事项</p>\n<p>请各院（系）提交答辩材料时，连同答辩回执（附件4）一并提交教务部。</p>\n<p>&nbsp;</p>\n<p>联系人：周花，许丽</p>\n<p>电话：84112344、84112341</p>\n<p>邮箱：<a href=\"mailto:jwbjhk@mail.sysu.edu.cn\">jwbjhk@mail.sysu.edu.cn</a></p>\n<p>&nbsp;</p>\n<p>附件：1.2019年本科专业培养方案答辩会安排</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;2.本科专业培养方案论证报告参考提纲</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;3.培养方案形式审核要点</p>\n<p>&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;4.院系答辩回执</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教务部</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2019年5月8日</p>\n", "2019-05-9", "2019-05-09 15:14:38", 0, "毕业论文，答辩，计算机类，本科生'''

c.execute('''INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(1, 0, "教务部关于2019年本科专业培养方案答辩评审安排的通知", "test", "2019-05-9", "2019-05-09 15:14:38", 0, "毕业论文，答辩，计算机类，本科生", "各学院、直属系：\n根据《中山大学关于组织开展2019年本科专业培养方案制订与修订工作的通知》（教务〔2019〕66号）精神，2019年本科专业培养方案制订工作已进入学校审议阶段，形式审核通过的培养方案均已送校外专家进行通讯评审。现定于2019年5月13日（周一）召开答辩会，对本科专业培养方案制订事宜进行分组审议，请各学院（系）按要求组织参会。", "http://jwb.sysu.edu.cn/content/47065");''')

c.execute('INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(1, 0, "教务部关于中山大学2019年大学生创业训练和创业实践项目拟推荐项目名单的公示", "test", "2019-05-10", "2019-05-10 14:56:20", 0, "公式, 创业训练, 创业实践", "各学院、直属系：\n根据《广东省教育厅关于报送2019年度国家级、省级大学生创新创业训练计划立项项目的通知》（粤教高函〔2019〕40号）要求，我校组织开展了2019年大学生创业训练和创业实践项目的申报推荐工作，经各学院（系）推荐、专家评审和学校审定，现将拟推荐项目名单予以公示。", "http://jwb.sysu.edu.cn/content/47066");')

c.execute('INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(2, 0, "2019年中山大学实验室开放基金项目拟推荐立项项目公示", "test", "2019-05-15", "2019-05-15 14:22:39", 0, "实验室开放基金项目，项目公式", "根据《教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知》要求，经我院组织专家评审，现对我院拟推荐立项的2019年中山大学实验室开放基金项目进行公示，拟推荐项目信息如下：", "http://sdcs.sysu.edu.cn/content/4819");')

c.execute('INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(2, 0, "数据科学与计算机学院计算机类（计科、网工、信安）2019届本科生毕业论文答辩通知", "test", "2019-05-13", "2019-05-13 12:23:17", 0, "毕业论文，答辩，计算机类，本科生", "各位同学：\n数据科学与计算机学院计算机类（计科、网工、信安）专业2019届本科生毕业论文答辩分组名单及答辩要求见附件，请同学们认真查看，按时参加答辩。（5月9日已经在年级群通知）\n祝同学们答辩顺利！\n数据科学与计算机学院教务办\n2019年5月13日", "http://sdcs.sysu.edu.cn/content/4809");')

c.execute('INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(2, 0, "数据科学与计算机学院软件工程（移动信息工程）、保密管理、信息与计算科学专业2019届毕业生论文答辩安排", "test", "2019-05-10", "2019-05-10 14:56:20", 0, "毕业论文，答辩，软件工程，移动信息工程，保密管理，信息与计算科学，本科生", "各位同学：\n您好！附件是2019届毕业生论文答辩安排表及答辩须知。请同学们认真查看，按规定的时间、地点及答辩次序准备答辩。\n预祝同学们答辩顺利！\n数据科学与计算机学院本科教务办\n2019.5.10", "http://sdcs.sysu.edu.cn/content/4808");')

c.execute('INSERT INTO NEWS (source_id, subscription_id, news_title, news_text, publish_date, fetch_time, is_bookmarked, news_keyword, news_abstract, news_address) VALUES(2, 0, "数据科学与计算机学院软件工程专业2019届本科生毕业论文答辩通知", "test", "2019-05-09", "2019-05-09 20:34:10", 0, "毕业论文，答辩，软件工程，本科生", "答辩须知：\n1. 本科生毕业论文是对学生本科学习阶段最重要的一次综合考察，请同学们认真对待。参加答辩时需穿戴整齐，不要穿T-shirt、牛仔裤、运动鞋、拖鞋等。\n2.没有在规定时间内提交毕业论文纸质打印版终稿的同学将不安排参加此次答辩，论文成绩一律评定为“不及格”。3. 请参加论文答辩的同学提前十五分钟（即上午8: 45，下午1: 15）到指定地点参加答辩（答辩学生名单及时间地点安排详见附件），签到并在答辩开始前将所需文件和演示环境安装在讲台的计算机中。若安排在学院办公大楼答辩的同学请自带演示电脑（学院的投影仪都是VGA接口，如果自家电脑是其他接口的请自带转换器）。", "http://sdcs.sysu.edu.cn/content/4806");')

c.execute('''CREATE TABLE IF NOT EXISTS ATTACHMENT
        (
            att_id INTEGER PRIMARY KEY AUTOINCREMENT,
            news_id INT NOT NULL,
            att_name TEXT NOT NULL,
            att_address TEXT NOT NULL
        );
''')

c.execute('INSERT INTO ATTACHMENT (news_id, att_name, att_address) VALUES(2, "附件1 2019年本科专业培养方案答辩会安排", "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_1_2019nian_ben_ke_zhuan_ye_pei_yang_fang_an_da_bian_hui_an_pai_.xls");')

c.execute('INSERT INTO ATTACHMENT (news_id, att_name, att_address) VALUES(2, "附件2 本科专业培养方案论证报告参考提纲", "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_2_ben_ke_zhuan_ye_pei_yang_fang_an_lun_zheng_bao_gao_can_kao_ti_gang_.doc");')

c.execute('INSERT INTO ATTACHMENT (news_id, att_name, att_address) VALUES(2, "附件3 培养方案形式审核要点", "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_3_pei_yang_fang_an_xing_shi_shen_he_yao_dian_.docx");')

c.execute('INSERT INTO ATTACHMENT (news_id, att_name, att_address) VALUES(2, "附件4 院系答辩回执", "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_4_yuan_xi_da_bian_hui_zhi_.docx");')

data.commit()

s = c.execute('SELECT * FROM ATTACHMENT')
for rows in s:
    print(rows)


c.close()
data.close()