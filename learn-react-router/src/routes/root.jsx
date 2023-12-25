import {
  Link,
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

/**
 * 获取联系人列表
 * @param {type}
 * @returns
 * */
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

/**
 * 创建联系人,并跳转到详情页,执行于组件渲染之后
 * @param {type}
 * @returns
 * */
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}`);
}

/**
 * @Date        2023/12/24 15:42:36
 * @Author      zono
 * @Description 根布局组件
 * */
export default function Root() {
  //useLoaderData()获取loader()返回的数据
  //有点像react的useContext()，但是useContext()是获取上下文数据
  const { contacts } = useLoaderData();
  //useNavigate()获取导航对象
  //有点像react的useHistory()，但是useHistory()是获取历史对象
  const navigate = useNavigate();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigate.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
