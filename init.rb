Redmine::Plugin.register :find_by_sql do
  name 'Find By Sql plugin'
  author 'Yasuyuki Suzuki'
  description 'This is a plugin for Redmine'
  version '0.0.2'
  url 'https://github.com/ysuzukisra/redmine-find_by_sql'
  author_url 'https://github.com/ysuzukisra'
  
  menu :admin_menu, :find_by_sql, { :controller => 'find_by_sql', :action => 'index' }
end
