import $ from 'jquery'

export const addCodeBtn = (_) => {
  // markdown代码存放在pre code 标签对中
  $('pre code').each((idx, item) => {
    // 添加复制按钮，此处使用的是element-ui icon 图标
    let $copy = $('<i title="copy"/>').addClass('el-icon-document-copy code-copy')
    $(item)
      .parent()
      .css({ position: 'relative' })
      .addClass('code')
      .append($copy)
    $copy
      .css({
        position: 'absolute',
        top: 0,
        right: 0,
        background: '#464d5e',
        padding: '3px',
        margin: '3px 3px 0 0',
        'font-size': '15px',
        'border-radius': 'inherit',
        color: '#fff',
        cursor: 'pointer'
      })
    $('.code i.code-copy').ready(() => {
      $('.code i.code-copy')
        .click(e => {
          let text = $(e.target).siblings('code').text()
          let element = $(`<textarea>${text}</textarea>`)
          $('body').append(element)
          element[0].select()
          document.execCommand('Copy')
          element.remove()
          // 这里是自定义的消息通知组件
          _(({ msg: '代码复制成功', type: 'success' }))
        })
    })
  })
}
