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