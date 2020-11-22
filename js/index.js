$(function () {



    $('#ipt').on('keyup', function () {
        clearTimeout(timer);


        let resc = catchobj[this.value.trim()];
        if (resc) return rendersuggestlist(resc);
        var keywords = $(this).val().trim()
        if (keywords.length <= 0) {
            return
        }
        console.log(keywords);

        getsuggestList(keywords);

    })

})
var baseurl = 'https://suggest.taobao.com/sug?q='
var timer = null;
let catchobj = {};
function bound(keywords) {
    timer = setTimeout(function () {
        getsuggestList(keywords)
    }, 500)
}

function getsuggestList(kw) {
    $.ajax({
        url: baseurl + kw,
        dataType: 'jsonp',
        success: function (res) {
            rendersuggestlist(res)
        }
    })
}

function rendersuggestlist(res) {
    if (res.result.length <= 0)
        return $('#suggest-list').empty().hide();




    var htmlstr = template('tpl-suggestList', res)
    $('#suggest-list').html(htmlstr).show()

    let kw = $('#ipt').val().trim()
    catchobj[kw] = res;
}