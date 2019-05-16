# !/usr/bin/python
# -*- coding: UTF-8 -*-

s = '''[
      {
        id: 0,
        name: '本科生教务',
        department: 'SDCS',
        news: [
          {
            id: 3,
            title: '数据科学与计算机学院计算机类（计科、网工、信安）2019届本科生毕业论文答辩通知',
            excerpt: '各位同学：\n数据科学与计算机学院计算机类（计科、网工、信安）专业2019届本科生毕业论文答辩分组名单及答辩要求见附件，请同学们认真查看，按时参加答辩。（5月9日已经在年级群通知）\n祝同学们答辩顺利！\n数据科学与计算机学院教务办\n2019年5月13日',
            content: '各位同学：\n数据科学与计算机学院计算机类（计科、网工、信安）专业2019届本科生毕业论文答辩分组名单及答辩要求见附件，请同学们认真查看，按时参加答辩。（5月9日已经在年级群通知）\n祝同学们答辩顺利！\n数据科学与计算机学院教务办\n2019年5月13日',
            url: 'http://sdcs.sysu.edu.cn/content/4809',
            attachments: [

            ],
          },
          {
            id: 2,
            title: '数据科学与计算机学院软件工程（移动信息工程）、保密管理、信息与计算科学专业2019届毕业生论文答辩安排',
            excerpt: ' 各位同学：您好！附件是2019届毕业生论文答辩安排表及答辩须知。请同学们认真查看，按规定的时间、地点及答辩次序准备答辩。预祝同学们答辩顺利！数据科学与计算机学院本科教务办2019.5.10',
            date: '2019/05/10',
          },
          {
            id: 1,
            title: '数据科学与计算机学院软件工程专业2019届本科生毕业论文答辩通知',
            excerpt: '答辩须知：1. 本科生毕业论文是对学生本科学习阶段最重要的一次综合考察，请同学们认真对待。参加答辩时需穿戴整齐，不要穿T-shirt、牛仔裤、运动鞋、拖鞋等。2.没有在规定时间内提交毕业论文纸质打印版终稿的同学将不安排参加此次答辩，论文成绩一律评定为“不及格”。3. 请参加论文答辩的同学提前十五分钟（即上午8:45，下午1:15）到指定地点参加答辩（答辩学生名单及时间地点安排详见附件），签到并在答辩开始前将所需文件和演示环境安装在讲台的计算机中。若安排在学院办公大楼答辩的同学请自带演示电脑（学院的投影仪都是VGA接口，如果自家电脑是其他接口的请自带转换器）。',
            date: '2019/05/09',
          },
          {
            id: 0,
            title: '转：教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知',
            excerpt: ' 各位同学：现转发《教务部关于开展2019年中山大学实验室开放基金项目推荐工作的通知》（附件1），有意向申报的学生团队，请于5月13日中午12点前提交《中山大学实验室开放基金项目申请书》（附件2）纸质版一式三份至学院A111吴老师处，电子版《中山大学实验室开放基金项目申请书》及《中山大学实验室开放基金项目信息登记汇总表》（附件3）请发至吴老师邮箱：wulanlan@mail.sysu.edu.cn。',
            date: '2019/05/06',
          },
        ],
      },
]'''

import flask

test = flask.Flask(__name__)

@test.route('/')
def Test():
    return 'Hello, World'

# 获得订阅分类，每个分类返回名字，id，和前几篇文章
# @test.route('/subsription')
# def Subsription():
#     article = fetch_subscription.article[0] + fetch_subscription.article[1] + fetch_subscription.article[3]
#     tar = fetch_subscription.name + fetch_subscription.id + article
#     return tar

# 根据文章id获取title，内容，发布时间，抓取时间，摘要

@test.route('/article')
def Article():
    return s