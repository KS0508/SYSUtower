// subscription 数组。[ ] 包裹数组（列表），{ } 包裹对象（键值对/字典）
[
    // 一个 subscription 对象，实质是一个 source
    {
      "id": 1,    // 在 source 表中的唯一 ID
      "name": "通知",    // source 的名字
      "department": "教务部",    // source 的部门的名字
      "news": [    // source 对应的新闻数组
        // 一个 news 对象
        {
          "id": 7,    // 在 news 表中的唯一 ID
          "title": "教务部关于做好2019届本科毕业论文答辩和校级优秀毕业论文评选工作的通知",  // news 的标题
          "publishDate": "2019-05-16",    // news 在网页上显示的发布日期。网页上有多种格式，请统一为 yyyy-MM-dd，即四位数年-两位数月-两位数日。Python 日期格式为 %Y-%m-%d
          "fetchTime": "2019-05-16 10:24:31",    // 爬虫第一次抓取到该 news 的时间。统一为 yyyy-MM-dd hh:mm:ss。Python 日期格式为 %Y-%m-%d %H:%M:%S
          "is_favorite": false,    // 是否是用户收藏的新闻
          "keywords": [    // 关键字数组，仅为实例
            "毕业论文答辩",
            "校级优秀毕业论文评选",
            "本科",
            "2019届"
          ],
          // 摘要，由 Parser 生成，暂定用 \n 分割行
          "excerpt": "各学院、直属系：\n本科生毕业论文（含毕业设计，下同）是本科教学阶段培养学生综合素质与创新、实践能力的重要环节，是对学生本科学习阶段最重要的一次综合考察。根据《中山大学本科生毕业论文的有关规定》和《教务部关于加强2019届本科生毕业论文（设计）管理工作的通知》（教务〔2019〕98号），并做好校级优秀毕业论文评选推荐工作，现将有关事项通知如下：",
          // 新闻内容，由 Spider 提取返回，无需 simplify，只要将对应 div 中的 HTML 返回即可
          "content": "<div class=\"rteright\"><span style=\"font-size:16px\"><span style=\"font-family:仿宋_gb2312\">教务〔</span><span style=\"font-family:times new roman,serif\" xml:lang=\"EN-US\" lang=\"EN-US\">2019</span><span style=\"font-family:仿宋_gb2312\">〕</span><span style=\"font-family:times new roman,serif\" xml:lang=\"EN-US\" lang=\"EN-US\">108</span><span style=\"font-family:仿宋_gb2312\">号</span></span></div>\n<p><span style=\"font-size:16px\">各学院、直属系：</span></p>\n<p><span style=\"font-size:16px\">本科生毕业论文（含毕业设计，下同）是本科教学阶段培养学生综合素质与创新、实践能力的重要环节，是对学生本科学习阶段最重要的一次综合考察。根据《中山大学本科生毕业论文的有关规定》和《教务部关于加强2019届本科生毕业论文（设计）管理工作的通知》（教务〔2019〕98号），并做好校级优秀毕业论文评选推荐工作，现将有关事项通知如下：</span></p>\n<p><span style=\"font-size:16px\">&nbsp;<strong>一、</strong>2019年5月15日至25日之间各学院（系）进行论文评阅、答辩工作。指导教师要根据《中山大学本科生毕业论文质量评定参考标准（试行）》对学生的毕业论文严格要求并掌握好评分标准；各学院（系）应把好答辩关，每一答辩小组由至少3名教师组成；各学院（系）教学负责人要对毕业论文的成绩进行全面复核。</span></p>\n<p><span style=\"font-size:16px\">&nbsp;&nbsp; &nbsp;各学院（系）可从本单位的教学业务费中支取本科生毕业论文（设计）答辩的相关费用，其标准按每生30元计。请各学院（系）严格按照2019届本科生参加毕业论文（设计）答辩的人数做好核算和支取工作。</span></p>\n<p><span style=\"font-size:16px\">&nbsp;&nbsp;&nbsp; 二、学校将对毕业论文（设计）进行抽查工作。各学院（系）应于5月24日前将《中山大学本科毕业论文情况统计表》（附件1）报教务部备案，5月27日前提交教务部选定抽查的毕业论文（设计）电子版至教务部。</span></p>\n<p><span style=\"font-size:16px\">&nbsp;&nbsp;&nbsp; <strong>三、</strong>各学院（系）应遵循“科学公正、注重创新”的原则，根据毕业论文的选题、课题设计、分析论证、写作规范等方面，对校级优秀毕业论文进行评选和推荐。按本单位的推优名额（附件2）从成绩评定为“优秀”的本科毕业论文里优中选优、排序推荐，宁缺毋滥。</span></p>\n<p><span style=\"font-size:16px\">&nbsp;&nbsp;&nbsp; 5月30日前提交《中山大学2019届校级优秀本科毕业论文推荐表》（附件3）以及所推荐论文的电子版，逾期视为放弃推荐处理。推荐论文请按附件4论文格式要求进行整理后，转化为PDF格式，以“推荐序号+学院+姓名+论文题目”命名。</span></p>\n<p><span style=\"font-size:16px\">&nbsp;&nbsp;&nbsp; 四、按照《教务部关于加强2019届本科生毕业论文（设计）管理工作的通知》的要求，5月31日前各学院（系）完成毕业论文成绩录入，毕业论文归档工作。6月8日前将《本科毕业论文情况统计表》，毕业论文工作总结报告报送教务部。</span></p>\n<p><span style=\"font-size:16px\">&nbsp;</span></p>\n<p><span style=\"font-size:16px\">&nbsp;</span></p>\n<p><span style=\"font-size:16px\">&nbsp;</span></p>\n<p><span style=\"font-size:16px\">&nbsp;</span></p>\n<p><span style=\"font-size:16px\">&nbsp;</span></p>\n<p><span style=\"font-size:16px\">附件1：中山大学本科毕业论文情况统计表</span></p>\n<p><span style=\"font-size:16px\">附件2：中山大学2019届校级优秀本科毕业论文推选名额（分发）</span></p>\n<p><span style=\"font-size:16px\">&nbsp;附件3：中山大学2019届校级优秀本科毕业论文推荐表</span></p>\n<p><span style=\"font-size:16px\">&nbsp;附件4：推荐论文格式要求</span></p>\n<p><span style=\"font-size:16px\">&nbsp;</span></p>\n<div class=\"rteright\"><span style=\"font-size:16px\">教务部</span></div>\n<div class=\"rteright\"><span style=\"font-size:16px\">2019年5月15日</span></div>\n<p><span style=\"font-size:16px\">（联系人：张莹，联系电话：84112403，电子邮箱：<a href=\"mailto:jwbzlk@mail.sysu.edu.cn\">jwbzlk@mail.sysu.edu.cn</a>）</span></p>\n<p>&nbsp;</p>\n",
          "url": "http://jwb.sysu.edu.cn/content/47068",    // news 的原文完整地址，务必带上域名
          "attachments": [    // news 对应的 attachment 数组
            // 一个 attachment 对象
            {
              "id": 15,    // 在 attachment 表里的唯一 ID
              "name": "附件1：中山大学本科毕业论文情况统计表",    // 网页上显示的附件名字
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_1zhong_shan_da_xue_ben_ke_bi_ye_lun_wen_qing_kuang_tong_ji_biao_.xlsx"    // 附件地址
            },
            {
              "id": 14,
              "name": "附件3：中山大学2019届校级优秀本科毕业论文推荐表",
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_3zhong_shan_da_xue_2019jie_xiao_ji_you_xiu_ben_ke_bi_ye_lun_wen_tui_jian_biao_.xlsx"
            },
            {
              "id": 13,
              "name": "附件4：推荐论文格式要求",
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_4tui_jian_lun_wen_ge_shi_yao_qiu__0.doc"
            }
          ]
        },
        {
          "id": 6,
          "title": "教务部关于中山大学2019年大学生创业训练和创业实践项目拟推荐项目名单的公示",
          "publishDate": "2019-05-10",
          "fetchTime": "2019-05-10 14:56:20",
          "is_favorite": true,
          "keywords": [
            "公示",
            "创业训练",
            "创业实践"
          ],
          "excerpt": "各学院、直属系：\n根据《广东省教育厅关于报送2019年度国家级、省级大学生创新创业训练计划立项项目的通知》（粤教高函〔2019〕40号）要求，我校组织开展了2019年大学生创业训练和创业实践项目的申报推荐工作，经各学院（系）推荐、专家评审和学校审定，现将拟推荐项目名单予以公示。",
          "content": "<div>\n<p>教务〔2019〕105号</p>\n<p>&nbsp;教务部关于中山大学2019年大学生创业训练和创业实践项目拟推荐项目名单的公示</p>\n<p>&nbsp;各学院、直属系：</p>\n<p>根据《广东省教育厅关于报送2019年度国家级、省级大学生创新创业训练计划立项项目的通知》（粤教高函〔2019〕40号）要求，我校组织开展了2019年大学生创业训练和创业实践项目的申报推荐工作，经各学院（系）推荐、专家评审和学校审定，现将拟推荐项目名单予以公示。</p>\n<p>公示期限内，对推荐项目有异议的个人和单位，可通过来信、来电、来访等形式反映项目的相关情况。反映公示项目的情况和问题，要坚持实事求是的原则，以个人名义反映情况的要求签署或自报本人真实姓名，以单位名义反映情况的应加盖单位公章。</p>\n<p>&nbsp;</p>\n<p>公示时间：2019年5月10日至2019年5月14日</p>\n<p>受理单位：教务部、监察处</p>\n<p>联系电话：84111549（教务部）</p>\n<p>84115582（监察处）</p>\n<p>电子邮箱：<a href=\"mailto:jwbsjk@mail.sysu.edu.cn\">jwbsjk@mail.sysu.edu.cn</a>（教务部）</p>\n<p><a href=\"mailto:prsdnjjh@mail.sysu.edu.cn\">prsdnjjh@mail.sysu.edu.cn</a>（监察处）</p>\n<p>&nbsp;</p>\n<p>教务部</p>\n<p>2019年5月10日</p>\n<p>&nbsp;</p>\n</div>\n<p>\n&nbsp;</p>\n<p>中山大学2019年大学生创业训练和创业实践项目</p>\n<p>拟推荐项目名单</p>\n<table style=\"width:624px\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody><tr><td style=\"height: 49px; width: 47px\">\n<p><strong>序号</strong></p>\n</td>\n<td style=\"height: 49px; width: 95px\">\n<p><strong>学院</strong></p>\n</td>\n<td style=\"height: 49px; width: 100px\">\n<p><strong>推荐级别</strong></p>\n</td>\n<td style=\"height: 49px; width: 206px\">\n<p><strong>项目名称</strong></p>\n</td>\n<td style=\"height: 49px; width: 95px\">\n<p><strong>项目类别</strong></p>\n</td>\n<td style=\"height: 49px; width: 81px\">\n<p><strong>负责人</strong></p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>1</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>地理科学与规划学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>“物联网＋”背景下以智慧食堂为基础的智慧高校建设</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>夏林峰</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>2</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>生命科学学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>规学——专业的大学生成长助力知识分享平台</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>谢冬纯</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>3</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>管理学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐省级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>打造共享经济背景下，社交招聘领域的趣头条——摘我招聘</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>罗杰聪</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>4</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>管理学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐省级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>践行可持续性经济，打造大健康背景下光变可撕拉指甲油</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>顾佳璇</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>5</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>社会学与人类学学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐省级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>C公益青年发展评估体系项目——中国青年发展领域的公益机构及基金会评估初探</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>欧芃瑞</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>6</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>数学学院（珠海）</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>以小程序入手——构建大学生活一站式服务平台</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>苏健钟</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>7</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>国际金融学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>逸生活——以中山大学为试点的校园健康服务平台</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>刘子露</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>8</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>电子与通信工程学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>觉晓教育-少儿编程特色课程研发</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业实践</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>陈子奕</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>9</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>生物医学工程学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>用于临床监测的新型柔性电极</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>欧雪莹</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>10</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>岭南学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>基于大数据分析的运动健康管理及市场营销策略</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>李子君</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>11</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>岭南学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>Pareto——数字经济时代下互联网+校园营销的解决方案&nbsp;&nbsp;</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>石津铫</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>12</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>岭南学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>UZIEN现场定制模式</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>李思捷</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>13</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>药学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>一种抗幽门螺杆菌“药食同源”功能食品的开发和应用</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>林艾灵</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>14</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>旅游学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>&nbsp;Yolo创意工作室</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>游可欣</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>15</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>心理学系</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐国家级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>孤独症相关人士行为干预APP</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>罗思萌</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>16</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>地理科学与规划学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐省级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>LBS熟人社交生活小程序</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>刘年华</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>17</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>海洋科学学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐省级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>基于物联网的花鲈种苗主要病害快速检测</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>龚涵</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>18</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>国际金融学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐省级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>学而——面向高校的互动学习式社群</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>董亚琪</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>19</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>数学学院（珠海）</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>ARLINK－AR+社交的探索</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>王彦苏</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>20</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>国际金融学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>S&amp;C热食自助贩卖机</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>柯彬彬</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>21</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>国际金融学院</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>随手帮-社区即时服务平台</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>刘瑾蓉</p>\n</td>\n</tr><tr><td style=\"height: 48px; width: 47px\">\n<p>22</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>心理学系</p>\n</td>\n<td style=\"height: 48px; width: 100px\">\n<p>拟推荐校级</p>\n</td>\n<td style=\"height: 48px; width: 206px\">\n<p>基于解决实验样本供给的被试招募平台-被窝(participants platform)</p>\n</td>\n<td style=\"height: 48px; width: 95px\">\n<p>创业训练</p>\n</td>\n<td style=\"height: 48px; width: 81px\">\n<p>卢俊宇</p>\n</td>\n</tr></tbody></table><p>&nbsp;</p>\n<p>&nbsp;</p>\n",
          "url": "http://jwb.sysu.edu.cn/content/47066",
          "attachments": []
        },
        {
          "id": 5,
          "title": "教务部关于2019年本科专业培养方案答辩评审安排的通知",
          "publishDate": "2019-05-09",
          "fetchTime": "2019-05-09 15:14:38",
          "is_favorite": false,
          "keywords": [
            "本科专业培养方案",
            "答辩",
            "评审安排"
          ],
          "excerpt": "各学院、直属系：\n根据《中山大学关于组织开展2019年本科专业培养方案制订与修订工作的通知》（教务〔2019〕66号）精神，2019年本科专业培养方案制订工作已进入学校审议阶段，形式审核通过的培养方案均已送校外专家进行通讯评审。现定于2019年5月13日（周一）召开答辩会，对本科专业培养方案制订事宜进行分组审议，请各学院（系）按要求组织参会。",
          "content": "<p>&nbsp;</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 教务〔2019〕100号</p>\n<p>&nbsp;</p>\n<p>各学院、直属系：</p>\n<p>根据《中山大学关于组织开展2019年本科专业培养方案制订与修订工作的通知》（教务〔2019〕66号）精神，2019年本科专业培养方案制订工作已进入学校审议阶段，形式审核通过的培养方案均已送校外专家进行通讯评审。现定于<strong>2019</strong><strong>年</strong><strong>5</strong><strong>月</strong><strong>13</strong><strong>日（周一）</strong>召开答辩会，对本科专业培养方案制订事宜进行分组审议，请各学院（系）按要求组织参会。</p>\n<p>一、答辩范围</p>\n<p>原则上，2019年招生的本科专业均需制定培养方案并参加答辩。按照2019年本科招生专业目录，根据学科情况分八组进行答辩，具体安排见附件1。</p>\n<p>二、答辩要求</p>\n<p>（一）院（系）参会人员</p>\n<p>各院（系）主管教学负责人、专业负责人、本科教学秘书（教务员）。</p>\n<p>（二）答辩方式</p>\n<p>各院（系）主管教学负责人对本单位的本科专业人才培养方案进行整体介绍和答辩，各专业负责人可进行必要的补充。</p>\n<p>（三）答辩时间和内容</p>\n<p><strong>1.</strong><strong>答辩时间安排。</strong>根据各院（系）办学情况以及答辩专业数量不同，陈述环节控制在20-30分钟左右（统一使用PPT汇报），剩余时间为现场互动时间。培养方案答辩的时间安排见附件1，请各院（系）答辩人员提前20分钟到场。</p>\n<p><strong>2.</strong><strong>陈述内容。</strong>陈述内容应严格以各院系向教务部提交的2019级本科人才培养方案为依据，主要包括2019级本科培养方案制订的整体思路和框架等，具体可参考本通知附件2。</p>\n<p><strong>三、答辩材料</strong></p>\n<p>（一）2019级本科人才培养方案及论证报告。现场评委审核将参考各院系提交的培养方案，请务必于<strong>5月8日12:00前</strong>提交2019级本科人才培养方案及论证报告（<strong>纸质版一式八份，同时电子版发送至<a href=\"mailto:jwbjhk@mail.sysu.edu.cn\">jwbjhk@mail.sysu.edu.cn</a></strong>），并在提交前仔细做培养方案形式审查，具体可参照形式审查要点对照自查（附件3），对于因形式原因未能通过答辩的，责任由院系自负。</p>\n<p>（二）答辩PPT。请各院（系）务必在<strong>5</strong><strong>月</strong><strong>10</strong><strong>日</strong><strong>12:00</strong><strong>前</strong>，将汇报用PPT电子版以及答辩回执报送教务部。PPT名称统一采用“xx学院（系）-x（个数）专业”形式命名，例如：中国语言文学系-1个专业。</p>\n<p>四、后续工作安排</p>\n<p>答辩完成后，教务部会将校内专家意见和校外通讯评审专家意见一并反馈至各院系，请各院系严格对照修改，并将修改后的培养方案以及修改说明提交教务部，以备二次审核。</p>\n<p>五、其他事项</p>\n<p>请各院（系）提交答辩材料时，连同答辩回执（附件4）一并提交教务部。</p>\n<p>&nbsp;</p>\n<p>联系人：周花，许丽</p>\n<p>电话：84112344、84112341</p>\n<p>邮箱：<a href=\"mailto:jwbjhk@mail.sysu.edu.cn\">jwbjhk@mail.sysu.edu.cn</a></p>\n<p>&nbsp;</p>\n<p>附件：1.2019年本科专业培养方案答辩会安排</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;2.本科专业培养方案论证报告参考提纲</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;3.培养方案形式审核要点</p>\n<p>&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;4.院系答辩回执</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;教务部</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2019年5月8日</p>\n",
          "url": "http://jwb.sysu.edu.cn/content/47065",
          "attachments": [
            {
              "id": 12,
              "name": "附件1 2019年本科专业培养方案答辩会安排",
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_1_2019nian_ben_ke_zhuan_ye_pei_yang_fang_an_da_bian_hui_an_pai_.xls"
            },
            {
              "id": 11,
              "name": "附件2 本科专业培养方案论证报告参考提纲",
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_2_ben_ke_zhuan_ye_pei_yang_fang_an_lun_zheng_bao_gao_can_kao_ti_gang_.doc"
            },
            {
              "id": 10,
              "name": "附件3 培养方案形式审核要点",
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_3_pei_yang_fang_an_xing_shi_shen_he_yao_dian_.docx"
            },
            {
              "id": 9,
              "name": "附件4 院系答辩回执",
              "url": "http://jwb.sysu.edu.cn/sites/sysujwb.prod.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_4_yuan_xi_da_bian_hui_zhi_.docx"
            }
          ]
        }
      ]
    },
    {
      "id": 0,
      "name": "本科生教务",
      "department": "SDCS",
      "news": [
        {
          "id": 4,
          "title": "2019年中山大学实验室开放基金项目拟推荐立项项目公示",
          "publishDate": "2019-05-15",
          "fetchTime": "2019-05-15 14:22:39",
          "is_favorite": false,
          "keywords": [
            "实验室开放基金项目",
            "项目公示"
          ],
          "excerpt": "根据《教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知》要求，经我院组织专家评审，现对我院拟推荐立项的2019年中山大学实验室开放基金项目进行公示，拟推荐项目信息如下：",
          "content": "<p>&nbsp;根据《教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知》要求，经我院组织专家评审，现对我院拟推荐立项的2019年中山大学实验室开放基金项目进行公示，拟推荐项目信息如下：</p>\n<table style=\"width:557px\" cellspacing=\"0\" cellpadding=\"0\" border=\"1\" align=\"center\"><tbody><tr><td style=\"height: 54px; width: 217px\">\n<p class=\"rtecenter\">项目名称</p>\n</td>\n<td style=\"height: 54px; width: 123px\">\n<p class=\"rtecenter\">拟推荐项目类型</p>\n</td>\n<td style=\"height: 54px; width: 113px\">\n<p class=\"rtecenter\">项目负责人姓名</p>\n</td>\n<td style=\"height: 54px; width: 104px\">\n<p class=\"rtecenter\">指导教师姓名</p>\n</td>\n</tr><tr><td style=\"height: 56px; width: 217px\">\n<p class=\"rtecenter\">星云</p>\n</td>\n<td style=\"height: 56px; width: 123px\">\n<p class=\"rtecenter\">重点</p>\n</td>\n<td style=\"height: 56px; width: 113px\">\n<p class=\"rtecenter\">颜彬</p>\n</td>\n<td style=\"height: 56px; width: 104px\">\n<p class=\"rtecenter\">陈鹏飞</p>\n</td>\n</tr><tr><td style=\"height: 56px; width: 217px\">\n<p class=\"rtecenter\">基于Slurm和Kubernetes的协同HPC调度系统设计与分析</p>\n</td>\n<td style=\"height: 56px; width: 123px\">\n<p class=\"rtecenter\">一般</p>\n</td>\n<td style=\"height: 56px; width: 113px\">\n<p class=\"rtecenter\">戴鑫</p>\n</td>\n<td style=\"height: 56px; width: 104px\">\n<p class=\"rtecenter\">杜云飞</p>\n</td>\n</tr></tbody></table><p>对拟推荐立项项目有异议的同学，自公布之日起3日内（2019年5月15日至5月17日），可向吴老师反馈，电话：39943153，邮箱：<a href=\"mailto:wulanlan@mail.sysu.edu.cn\">wulanlan@mail.sysu.edu.cn</a>。</p>\n<p>本次公示结果为拟推荐立项结果，具体立项结果以教务部后续通知为准。</p>\n<p class=\"rteright\">数据科学与计算机学院本科教务办</p>\n<p class=\"rteright\">2019年5月15日</p>\n",
          "url": "http://sdcs.sysu.edu.cn/content/4819",
          "attachments": []
        },
        {
          "id": 3,
          "title": "数据科学与计算机学院计算机类（计科、网工、信安）2019届本科生毕业论文答辩通知",
          "publishDate": "2019-05-13",
          "fetchTime": "2019-05-13 12:23:17",
          "is_favorite": false,
          "keywords": [
            "毕业论文",
            "答辩",
            "计算机类",
            "本科生"
          ],
          "excerpt": "各位同学：\n数据科学与计算机学院计算机类（计科、网工、信安）专业2019届本科生毕业论文答辩分组名单及答辩要求见附件，请同学们认真查看，按时参加答辩。（5月9日已经在年级群通知）\n祝同学们答辩顺利！\n数据科学与计算机学院教务办\n2019年5月13日",
          "content": "<p><span style=\"font-size:20px\">各位同学：</span></p>\n<p><span style=\"font-size:20px\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 数据科学与计算机学院计算机类（计科、网工、信安）专业2019届本科生毕业论文答辩分组名单及答辩要求见附件，请同学们认真查看，按时参加答辩。（5月8日已经在年级群通知）</span></p>\n<p><span style=\"font-size:20px\">祝同学们答辩顺利！</span></p>\n<p class=\"rteright\">&nbsp;</p>\n<p class=\"rteright\"><span style=\"font-size:20px\">数据科学与计算机学院教务办</span></p>\n<p class=\"rteright\"><span style=\"font-size:20px\">2019年5月13日</span></p>\n<p><span style=\"font-size:20px\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</span></p>\n",
          "url": "http://sdcs.sysu.edu.cn/content/4809",
          "attachments": [
            {
              "id": 8,
              "name": "2019届本科毕业生毕业论文答辩通知（给学生）.doc",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/2019jie_ben_ke_bi_ye_sheng_bi_ye_lun_wen_da_bian_tong_zhi_gei_xue_sheng__0.doc"
            },
            {
              "id": 7,
              "name": "2019届计算机类毕业论文答辩分组名单（给学生）.xls",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/2019jie_ji_suan_ji_lei_bi_ye_lun_wen_da_bian_fen_zu_ming_dan_gei_xue_sheng__0.xls"
            }
          ]
        },
        {
          "id": 2,
          "title": "数据科学与计算机学院软件工程（移动信息工程）、保密管理、信息与计算科学专业2019届毕业生论文答辩安排",
          "publishDate": "2019-05-10",
          "fetchTime": "2019-05-10 14:56:20",
          "is_favorite": false,
          "keywords": [
            "毕业论文",
            "答辩",
            "软件工程",
            "移动信息工程",
            "保密管理",
            "信息与计算科学",
            "本科生"
          ],
          "excerpt": "各位同学：\n您好！附件是2019届毕业生论文答辩安排表及答辩须知。请同学们认真查看，按规定的时间、地点及答辩次序准备答辩。\n预祝同学们答辩顺利！\n数据科学与计算机学院本科教务办\n2019.5.10",
          "content": "<p><span style=\"font-size:28px\">&nbsp;各位同学：</span></p>\n<p><span style=\"font-size:28px\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 您好！附件是2019届毕业生论文答辩安排表及答辩须知。请同学们认真查看，按规定的时间、地点及答辩次序准备答辩。预祝同学们答辩顺利！</span></p>\n<p><span style=\"font-size:28px\">&nbsp;</span></p>\n<p class=\"rtecenter\"><span style=\"font-size:28px\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style=\"font-size:18px\"> 数据科学与计算机学院本科教务办</span></p>\n<p class=\"rtecenter\"><span style=\"font-size:18px\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2019.5.10</span></p>\n<p class=\"rtecenter\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n",
          "url": "http://sdcs.sysu.edu.cn/content/4808",
          "attachments": [
            {
              "id": 6,
              "name": "(学生）2019届本科毕业生毕业论文答辩通知.doc",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/xue_sheng_2019jie_ben_ke_bi_ye_sheng_bi_ye_lun_wen_da_bian_tong_zhi_.doc"
            },
            {
              "id": 5,
              "name": "(学生）数据科学与计算机学院2019届本科毕业论文答辩统计表5.15.xlsx",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/xue_sheng_shu_ju_ke_xue_yu_ji_suan_ji_xue_yuan_2019jie_ben_ke_bi_ye_lun_wen_da_bian_tong_ji_biao_5.15.xlsx"
            }
          ]
        },
        {
          "id": 1,
          "title": "数据科学与计算机学院软件工程专业2019届本科生毕业论文答辩通知",
          "publishDate": "2019-05-09",
          "fetchTime": "2019-05-09 20:34:10",
          "is_favorite": false,
          "keywords": [
            "毕业论文",
            "答辩",
            "软件工程",
            "本科生"
          ],
          "excerpt": "答辩须知：\n1. 本科生毕业论文是对学生本科学习阶段最重要的一次综合考察，请同学们认真对待。参加答辩时需穿戴整齐，不要穿T-shirt、牛仔裤、运动鞋、拖鞋等。\n2.没有在规定时间内提交毕业论文纸质打印版终稿的同学将不安排参加此次答辩，论文成绩一律评定为“不及格”。3. 请参加论文答辩的同学提前十五分钟（即上午8: 45，下午1: 15）到指定地点参加答辩（答辩学生名单及时间地点安排详见附件），签到并在答辩开始前将所需文件和演示环境安装在讲台的计算机中。若安排在学院办公大楼答辩的同学请自带演示电脑（学院的投影仪都是VGA接口，如果自家电脑是其他接口的请自带转换器）。",
          "content": "<p><strong>答辩须知：</strong></p>\n<p>&nbsp;</p>\n<p>1. 本科生毕业论文是对学生本科学习阶段最重要的一次综合考察，请同学们认真对待。参加答辩时需穿戴整齐，不要穿T-shirt、牛仔裤、运动鞋、拖鞋等。</p>\n<p>2.没有在规定时间内提交毕业论文纸质打印版终稿的同学将不安排参加此次答辩，论文成绩一律评定为“不及格”。</p>\n<p>3. 请参加论文答辩的同学提前十五分钟（即上午8:45，下午1:15）到指定地点参加答辩（答辩学生名单及时间地点安排详见附件），签到并在答辩开始前将所需文件和演示环境安装在讲台的计算机中。若安排在学院办公大楼答辩的同学请自带演示电脑（学院的投影仪都是VGA接口，如果自家电脑是其他接口的请自带转换器）。</p>\n<p>4. 参加论文答辩的学生若有合理的特殊原因（实习、找工作等均不可作为合理理由），须至少提前3天提出书面申请，填写《数据科学与计算机学院本科生毕业论文免答辩申请表》，并附上证明材料交学院A111本科教务办，经学院主管教学的领导批准方可不参加答辩。获准不参加论文答辩者，其论文的成绩须降级，且不得评为“优秀”，最终成绩由学院组织的教学督导员审核后确定。未获批准而不参加论文答辩者，论文成绩一律评定为“不及格”。</p>\n<p>5. 毕业论文将以答辩小组评定的成绩为最终成绩。请参加答辩的同学认真对待，准备好论文介绍PPT。每个同学的答辩时间限制为13分钟（8分钟阐述，5分钟回答老师提问）。</p>\n<p>6. 答辩按“答辩分组名单”中指定的次序进行。</p>\n<p>预祝各位同学答辩顺利！</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p class=\"rteright\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据科学与计算机学院本科教务办</p>\n<p class=\"rteright\">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2019年5月9日</p>\n",
          "url": "http://sdcs.sysu.edu.cn/content/4806",
          "attachments": [
            {
              "id": 4,
              "name": "2019届软件工程专业本科生毕业论文答辩学生分组名单-挂网通知.xls",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/2019jie_ruan_jian_gong_cheng_zhuan_ye_ben_ke_sheng_bi_ye_lun_wen_da_bian_xue_sheng_fen_zu_ming_dan_-gua_wang_tong_zhi_.xls"
            },
            {
              "id": 3,
              "name": "数据科学与计算机学院本科生毕业论文免答辩申请表（模板）.doc",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/shu_ju_ke_xue_yu_ji_suan_ji_xue_yuan_ben_ke_sheng_bi_ye_lun_wen_mian_da_bian_shen_qing_biao_mo_ban_.doc"
            }
          ]
        },
        {
          "id": 0,
          "title": "转：教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知",
          "publishDate": "2019-05-06",
          "fetchTime": "2019-05-06 06:24:10",
          "is_favorite": false,
          "keywords": [
            "实验室开放基金项目",
            "转",
            "教务部"
          ],
          "excerpt": "各位同学：\n现转发《教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知》（附件1），有意向申报的学生团队，请于5月13日中午12点前提交《中山大学实验室开放基金项目申请书》（附件2）纸质版一式三份至学院A111吴老师处，电子版《中山大学实验室开放基金项目申请书》及《中山大学实验室开放基金项目信息登记汇总表》（附件3）请发至吴老师邮箱：wulanlan@mail.sysu.edu.cn。",
          "content": "<p>&nbsp;各位同学：</p>\n<p>现转发《教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知》（附件1），有意向申报的学生团队，请于<span style=\"color:#ff0000\"><strong>5月13日中午12点前</strong></span>提交《中山大学实验室开放基金项目申请书》（附件2）纸质版一式三份至学院A111吴老师处，电子版《中山大学实验室开放基金项目申请书》及《中山大学实验室开放基金项目信息登记汇总表》（附件3）请发至吴老师邮箱：<a href=\"mailto:wulanlan@mail.sysu.edu.cn\">wulanlan@mail.sysu.edu.cn</a>。</p>\n<p>学院将组织专家统一评审后再报送至教务部。</p>\n<p>&nbsp;</p>\n",
          "url": "http://sdcs.sysu.edu.cn/content/4800",
          "attachments": [
            {
              "id": 2,
              "name": "教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知.pdf",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/jiao_wu_bu_guan_yu_kai_zhan_2019nian_zhong_shan_da_xue_shi_yan_shi_kai_fang_ji_jin_xiang_mu_tui_jian_gong_zuo_de_tong_zhi_.pdf"
            },
            {
              "id": 1,
              "name": "附件3：中山大学实验室开放基金项目申请书（模板）.doc",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_3zhong_shan_da_xue_shi_yan_shi_kai_fang_ji_jin_xiang_mu_shen_qing_shu_mo_ban_.doc"
            },
            {
              "id": 0,
              "name": "附件2：中山大学实验室开放基金项目信息登记汇总表.xls",
              "url": "http://sdcs.sysu.edu.cn/sites/sdcs.live1.dpcms8.sysu.edu.cn/files/download/upload/fu_jian_2zhong_shan_da_xue_shi_yan_shi_kai_fang_ji_jin_xiang_mu_xin_xi_deng_ji_hui_zong_biao__0.xls"
            }
          ]
        }
      ]
    }
  ]