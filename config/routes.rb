# Plugin's routes
# See: http://guides.rubyonrails.org/routing.html

match "find_by_sql", :to => 'find_by_sql#index', via: [:get, :post]
