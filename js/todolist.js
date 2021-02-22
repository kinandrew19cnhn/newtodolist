$(function(){
    load();
    $("#title").on("keydown",function(event){
        if (event.keyCode === 13){
            if ($(this).val()===""){
                alert("请输入需要的操作")
            }else {
                var local = getDate();
                local.push({title: $(this).val(),done:false});
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    });
    $("ol, ul").on("click", "a", function() {
        
        // 获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1)
        // 保存到本地存储
        saveDate(data);
        // 重渲页面
        load();
    });
  
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        // 获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        console.log(index);
        
        data[index].done = $(this).prop("checked");
        console.log(data);

        // 保存到本地存储
        saveDate(data);
        // 重渲页面
        load();
    });
    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储里面的数据是字符串 但是我们需要的是对象
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // 加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; 
        var doneCount = 0; 
        // 遍历这个数据
        $.each(data, function(i, n) {
            console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }













})