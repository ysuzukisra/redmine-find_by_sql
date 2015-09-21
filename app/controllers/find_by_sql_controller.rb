# -*- encoding: utf-8 -*-

class FindBySqlController < ApplicationController
  unloadable
  
  def index
    @find_by_sql = FindBySqlHelper::FindBySql.new
    query = params[:find_by_sql][:query] if params.has_key?(:find_by_sql) && params[:find_by_sql].has_key?(:query)
    query ||= ""
    @find_by_sql.query = query

    # select_all は insert や update も出来てしまうが、その後、内部での結果格納時に例外が出るので
    # トランザクションを脱出してrollbackできた
    begin
      ActiveRecord::Base.connection.transaction do
        @result = ActiveRecord::Base.connection.select_all(query) if query.present?
      end
    rescue ActiveRecord::ActiveRecordError => e
      flash.now[:error] = e.message
    ensure
      @result ||= []
    end
  end
end
