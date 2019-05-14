## Source Database

| source_department | source_name                   | source_type | source_address       |
| ----------------- | ----------------------------- | ----------- | -------------------- |
| acdemia           | default name for subscription | website     | website_address      |
| department        |                               | wechat      | offcial_account_name |

## Subscription Database

| subscription_id | subscription_name        | subscription_type | subscription_sorurce | last_updated_time |
| --------------- | ------------------------ | ----------------- | -------------------- | ----------------- |
| 1               | can be modified by users | website           | website_address      |                   |
| 2               |                          | wechat            | offcial_account_name |                   |

## News Information Database

| news_id | news_type      | news_address    | news_full_content | news_abstract | keyword_count | keyword_1 | ...  | keyword_5 | is_bookmarked | created_time       | added_time | news_subscription_id | news_subscription_name |
| ------- | -------------- | --------------- | ----------------- | ------------- | ------------- | --------- | ---- | --------- | ------------- | ------------------ | ---------- | -------------------- | ---------------------- |
| 1       | website_news   | news_address    | simplified_html   | summary text  | <=5           |           |      |           | True          | written in news    |            |                      |                        |
| 2       | wechat_article | article_address | simplified_html   |               |               |           |      |           | False         | written in article |            |                      |                        |

## News Attachment Database

| news_id | news_type      | attachment_count | attachment_name_1 | attachment_address_1 | ...  | attachment_name_n | attachment_address_n |
| ------- | -------------- | ---------------- | ----------------- | -------------------- | ---- | ----------------- | -------------------- |
| 1       | wechat_article | 0                |                   |                      |      |                   |                      |
| 2       | website_news   | n                |                   |                      |      |                   |                      |




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