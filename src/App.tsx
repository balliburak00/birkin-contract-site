<div className="quoteItem" key={item.name}>
  <div className="quoteProductInfo">
    <div className="quoteProductImage">
      <img src={item.image} alt={item.name} />
    </div>

    <div>
      <small>
        {item.code} / {item.category}
      </small>
      <strong>{item.name}</strong>
    </div>
  </div>

  <div className="qtyControls">
    <button type="button" onClick={() => decreaseQty(item.name)}>
      -
    </button>
    <span>{item.qty}</span>
    <button type="button" onClick={() => increaseQty(item.name)}>
      +
    </button>
  </div>

  <button
    type="button"
    className="removeBtn"
    onClick={() => removeFromCart(item.name)}
  >
    {t.remove}
  </button>
</div>
