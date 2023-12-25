/**
 * @Date        2023/12/24 15:50:15
 * @Author      zono
 * @Description 错误页面
 * */
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>对不起，有脏东西</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
