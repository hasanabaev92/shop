import { Link } from "react-router";

function TopBar() {
  return (
    <>
      <div>
        <div>
          <Link to="/">
            <button>Список товаров</button>
          </Link>
        </div>
        <div>
          <Link to="/admin">
            <button>Админ</button>
          </Link>
        </div>
        <div>
          <Link to="/Cart">
            <button>Корзина</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopBar;
