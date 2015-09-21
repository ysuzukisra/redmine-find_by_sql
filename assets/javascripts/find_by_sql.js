$(function() {
  // クエリ文の末尾にカーソル移動
  var ta = $("#find_by_sql_query"),
      val = ta.val();
  ta.val("").val(val).focus();
})

// クエリ文入力テキストエリアで Ctrl-Enter が押されたらsubmitする
$(document).on("keypress", "#find_by_sql_query", function(e) {
  if (e.keyCode == 10
      || (e.keyCode == 13 && e.ctrlKey) ) {
    e.preventDefault();
    // $("#new_find_by_sql").submit();
    $("input[name=commit]").focus().trigger('click');
  } else {
    $.noop();
  }
});

// Grid表示 by HANDSONTABLE
$(function() {
  var container = $("#grid");
  var grid_option = container.data("option"),
      grid_data = container.data("data");
  if (!grid_option) {
    console.log("!grid_option");
    return;
  }
  // HANDSONTABLE でグリッド表示
  container.handsontable({
    data: grid_data,
    language: 'ja',
    readOnly: true,
    fillHandle: false,
    rowHeaders: false,
    colHeaders: Object.keys(grid_data[0]),
    columnSorting: true,
    search: true,
    sortIndicator: true,
    manualColumnMove: true,
    manualColumnResize: true,
    manualRowResize: true,
    contextMenu: ['alignment']
  });

  var grid_count = grid_data.length;
  var msg = $("label#search_message");
  var msg_str = "Total " + grid_count + " rows.";
  msg.text(msg_str);

  // 検索処理
  var hot = container.handsontable('getInstance');
  var search_field = $("input#search_str");
  search_field.on('keyup blur', function (eve) {
    var val = this.value,
        msg_str = "Total " + grid_count + " rows.",
        query_result = hot.search.query(this.value);
    hot.render();

    if (val.length > 0) {
      if (query_result.length > 0) {
        msg_str += " Search "
                 + $('#grid tbody tr .htSearchResult').parent().length + " rows, "
                 + query_result.length + " cells found.";
        $('#grid tbody tr ').hide();                            // 全行非表示
        $('#grid tbody tr .htSearchResult').parent().show();    // ヒット行表示
      } else {
        msg_str += " Search not found.";
        $('#grid tbody tr ').show();    // 全行表示
      }
    } else {
      $('#grid tbody tr ').show();      // 全行表示
    }
    msg.text(msg_str);
  });
})
