## Source Database

| source_id | source_department_name | source_sub_name | source_type | source_address        |
| --------- | ---------------------- | --------------- | ----------- | --------------------- |
| 1         |                        |                 | website     | website_address       |
| 2         |                        |                 | wechat      | official_account_name |

## Subscription Database

| subscription_id | subscription_type | subscription_sorurce | last_updated_time |
| --------------- | ----------------- | -------------------- | ----------------- |
| 1               | website           | website_address      |                   |
| 2               | wechat            | offcial_account_name |                   |

## News Information Database

| subscription_id | news_id | news_address    | news_title | news_text | news_content_html | news_abstract | is_bookmarked | publish_time       | fetch_time |
| --------------- | ------- | --------------- | ---------- | --------- | ----------------- | ------------- | ------------- | ------------------ | ---------- |
|                 | 1       | news_address    |            |           | simplified_html   | summary text  | True          | written in news    |            |
|                 | 2       | article_address |            |           | simplified_html   |               | False         | written in article |            |

## News Attachment Database

| news_id | attachment_id | attachment_name | attachment_address |
| ------- | ------------- | --------------- | ------------------ |
| 1       |               |                 |                    |
| 2       |               |                 |                    |

## News Keyword Database

| news_id | keyword |
| ------- | ------- |
|         |         |




```sequence
Participant parser as p
Participant database as d
Participant middle as m
Participant front as f
Participant spider as s

NOTE over m :  scraping
m --> f : signal, start waiting
m -> d : fetch_subscription()
d --> m : subscription data
m -> s : scrap(subscription_json)
s --> m : json, news URI, simplified html, attachment info 
m -> p : parse(news_text)
p --> m : json, keywords, abstract
m --> d : news and attachment info
m --> f : signal, stop waiting
m --> f : json, news_info
NOTE over m : open new tab
f -> m : news_tab(news_info)
m -> d : html_query(news_info)
d --> m : simplified html
m -> d : attachment_query(news_info)
d --> m : attachment_info
m --> f : news_html, attachment info
NOTE over m : download attachment
f -> m : download_request(attachment_info)
m -> d : fetch_attachment(attachment_info)
d --> m : attachment address and name
m --> f : signal, download status
NOTE over m : bookmark
f -> m : bookmark(news_info)
m -> d : modify_mark_status(news_info)
d --> m : 
m --> f : signal, new status
NOTE over m : open bookmarks
f -> m : open_bookmark()
m -> d : all_bookmarked_news()
d --> m : bookmarked_news
m --> f : json, bookmarked_news
NOTE over m : search and filt
f -> m : search(keyword, mode)
m -> d : search_news(keyword, mode)
d --> m : all_news_info
m --> f : json, news_list
NOTE over m : add subscription
f -> m : open_all_sources()
m -> d : all_sources()
d --> m : all sources info
m --> f : json, sources_list
f -> m : add_new_subscription(source_info)
m -> d : add_subscription(source_info)
```