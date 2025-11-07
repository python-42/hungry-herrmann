import "./FoodMenu.css"
function FoodMenu({obj}) {
    const nodes = [];

    const menuItems = obj.items;
    for (let i in menuItems) {
        nodes.push(<p key={i}>{menuItems[i].name}</p>)
    }

    return (
        <div id="menuRoot">
            <h3>{obj.name}</h3>
            <div className="foodContainer">
                {nodes}
            </div>
        </div>
    )
}

export default FoodMenu;