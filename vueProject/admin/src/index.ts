/**
 * @Description: 
 * @Author: shenxf
 * @Date: 2018-03-24 23:04:44
 */
import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";
import app from "./App.vue";

let v = new Vue({
    el: "#app",
    render: c => c(app),
    data: { name: "World" },
    // components: {
    //     HelloComponent,
    //     HelloDecoratorComponent
    // }
});
