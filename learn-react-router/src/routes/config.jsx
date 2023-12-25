/**
 * @Date        2023/12/25 14:21:16
 * @Author      zono
 * @Description router配置
 * */
//导入路由加载器
// import { loader as rootLoader, action as rootAction } from "./routes/root";
// import { loader as contactLoader } from "./routes/contact";
// import EditContact, { action as editAction } from "./routes/edit";

//导入组件
// import Root from "./routes/root";
import ErrorPage from "../error-page";
// import Contact from "./routes/contact";
import TodoList from "../componets/Todolist";

const routerConfig = [
  {
    path: "/", //根路径
    element: (
      <div className="h-screen w-screen bg-lime-600 p-2 ">
        {/* <StrictMode> */}
        <TodoList title="todolist1" />
        {/* </StrictMode> */}
      </div>
    ),
    errorElement: <ErrorPage />, //错误页面
    // loader: rootLoader,
    // action: rootAction,
    // children: [
    //   {
    //     path: "/contacts/:contactId",
    //     element: <Contact />,
    //     loader: contactLoader,
    //   },
    //   {
    //     path: "/contacts/:contactId/edit",
    //     element: <EditContact />,
    //     loader: contactLoader,
    //     action: editAction,
    //   },
    // ],
  },
  {
    path: "/todo",
    element: <TodoList />,
  },
];
export default routerConfig;
