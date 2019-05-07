# Interface Reference

| 类          | 接口                        | 参数                         | 返回值                    | 异常 |
| ----------- | --------------------------- | ---------------------------- | ------------------------- | ---- |
| spider      | get_page_html               | string address               | string simplified_html    |      |
|             | get_raw_page_html           | string address               | string raw_html           |      |
|             | get_page_text               | string address               | string page_text          |      |
|             | get_page_attachment_name    | string address               | string attachment_name    |      |
|             | get_page_attachment_address | string address               | string attachment_address |      |
|             | get_page_attachment_content | string address               | string content            |      |
|             | get_page_title              | string address               | string title              |      |
| news_parser | get_keywords                | string title, string text    | string[] keyword          |      |
|             | get_summary                 | string text                  | string summary            |      |
| front       |                             |                              |                           |      |
| middle      | download_attachment         | string attachment_address    | void                      |      |
|             | search                      | string input                 | card[] news_list          |      |
|             | keyword_filter              | string[] keywords            | card[] news_list          |      |
|             | generate_display_card       | string address               | card                      |      |
|             | add_bookmark                | card news                    | void                      |      |
|             | delete_bookmark             | card news                    | void                      |      |
|             | update_page_database        | subscription[]               | void                      |      |
|             | add_subscription            | subscription[], subscription | void                      |      |
|             | delete_subscription         | subscription[], index        | void                      |      |
