var initial = 1;
var threshold = 100;
var end = initial + threshold

for (var i = 1; i < 50; i++){

    // console.log('HELLO')
    $('.grid').append(`
        <div class="grid-item">
            <img src="hello/1 (`+i+`).jpg" />
        </div>
    `)
    // console.log( `<img src="hello/1 (`+i+`).jpg" />`)
}

initial = end;
end = initial + threshold

var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200,
    gutter: 10

});

$grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

var masonryUpdate = function() {
    setTimeout(function() {
        $('.grid').masonry();
        console.log('update');
    }, 0);
}


$('#seeMore').click(function(){

  // initial = 50;
  // end = initial + threshold
  // console.log('HELLO');
  var arrayofItem = '';
  console.log(initial, end)
  for (var i = initial; i < end; i++){
      text = `
          <div class="grid-item">
              <img src="hello/1 (`+i+`).jpg" />
          </div>
      `;
      arrayofItem += text

  }

  // console.log(arrayofItem)
  var $items = $(arrayofItem)
  $grid.append( $items ).imagesLoaded(function(){
    $grid.masonry( 'appended',$items, true );
  })

  initial = end;
  end = initial + threshold

})

// $(window).scroll(function() {
//     // console.log($(window).scrollTop(), $(document).height() - $(window).height())
//     if($(window).scrollTop() >= $(document).height() - $(window).height()) {
//         console.log('HELLO')
//
//         // for (var i = initial; i < end; i++){
//         //     $item = $('.grid').append(`
//         //         <div class="grid-item">
//         //             <img loading="lazy" src="hello/1 (`+i+`).jpg" />
//         //         </div>
//         //     `)
//         //     console.log($item)
//         //     $grid.masonry('appended', $item);
//         // }
//         // setTimeout(function() {
//         //     console.log($('.grid'))
//         //     // $('.grid').masonry('destroy');
//         //     // // $('.grid').removeData('masonry');
//         //     // $('.grid').masonry( 'reloadItems');
//         //     // $grid.masonry('reloadItems')
//         //     // $container.masonry( 'prepended', $data, true );
//         // }, 1000);
//
//
//
//
//
//         initial = 50;
//         end = initial + threshold
//     }
//
// });
