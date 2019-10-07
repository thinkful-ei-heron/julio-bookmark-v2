import api from './api.js';
let filter = 0;
function loadData() {
        api.getURLs()
            .then((res) => res.json())
            .then((data) => generateList(data));
};
function generateListItem(item){ 
  let list = '';
    item.forEach((item) => {
        list +=
            `<li id='${item.id}'>
            <a href="${item.url}">${item.title}</a>
            <button id="${item.id}" class="delete-button">Delete</button>
            <button id="${item.id}" class="expand-button">Expand</button>
            <div class="hidden expandable">
            <label for='desc'>Description</label>
            <input type='text' name='desc' class='edit-desc' value='${item.desc}'>
            <label for='rating'>Rating</label>
            <input type='number' name='rating' class='edit-rate' value='${item.rating}'>
            </div>
            </li>`
        });
  $('.bookmark-input').html(list);
};
function generateList(list){
    let entries = Object.values(list);
    let filtered = entries.filter((item) => item.rating >= filter);
    generateListItem(filtered);
};
function toggleForm() {
    $('.submit-buttons').on('click','.add-button', e => {
        e.preventDefault();
        $('.form').toggleClass('hidden');
    })
};
function watchNewItemSubmit() {
    $('#submit-form').on('submit', event => {
        event.preventDefault();
        const $form = $(event.currentTarget);
        const title = $form.find('input[name="title"]').val().trim();
        const url = $form.find('input[name="url"]').val().trim();
        const descr = $form.find('input[name="desc"]').val().trim();
        const rating = parseInt($form.find('select[name="rating"]').val(), 10);
        const newBookmark = {title:title,url:url,desc:descr,rating:rating};
        api.createBookmark(newBookmark)
            .then(loadData);
        $('.form').toggleClass('hidden');
        $('.form-title').val('');
        $('.form-url').val('');
        $('.form-descr').val('');
        $('.form-rate').val(0);
    });
};
function toggleCancel() {
    $('#cancel-button').on('click', e => {
        e.preventDefault();
        $('.form').toggleClass('hidden');
        $('.form-title').val('');
        $('.form-url').val('');
        $('.form-descr').val('');
        $('.form-rate').val(0);
    })
};
function deleteListItem() {
    $('.bookmark-input').on('click','.delete-button', e => {
        let itemDeleted = $(e.currentTarget).attr('id');
        api.deleteBookmark(itemDeleted)
            .then(loadData);
    })
};
function toggleExpandProperty(){
    $('.bookmark-input').on('click','.expand-button', e => {
        e.preventDefault();
        $(e.currentTarget).closest('li').find('.expandable').toggleClass('hidden');
    })
};
function handleFilter() {
   $('.submit-buttons').on('change','.filter-button', e => {
       filter = e.currentTarget.value;
       loadData();
   })
};
function handleExpandableFieldEdit(){
    $('.results').on('blur','input.edit-desc', e => {
        let id = $(e.currentTarget).closest('li').attr('id');
        let newObj = {desc: e.currentTarget.value};
        api.updateBookmark(id,newObj);
    });
    $('.results').on('blur','input.edit-rate', e => {
        let id = $(e.currentTarget).closest('li').attr('id');
        let newObj = {rating: e.currentTarget.value};
        api.updateBookmark(id,newObj);
    });
}
function bindEventListeners() {
    deleteListItem();
    toggleCancel();
    watchNewItemSubmit();
    toggleForm();
    toggleExpandProperty();
    handleExpandableFieldEdit();
    handleFilter();
};
export default {
    bindEventListeners,
    loadData,
}