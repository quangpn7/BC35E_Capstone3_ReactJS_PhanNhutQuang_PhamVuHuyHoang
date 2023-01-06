export const OrderHistoryTable = (ordersHistory, minIndex, maxIndex) => {
  // const ordersHistory = userProfile?.ordersHistory;
  if (ordersHistory?.length !== 0) {
    return ordersHistory?.slice(minIndex, maxIndex).map((order, index) => {
      const { date, orderDetail } = order;
      return (
        <div className="order__table mt-5" key={index}>
          <p className="order__time">
            + Orders have been placed on {date.split("T")[0]}
          </p>

          <table className="table table-hover table-responsive-sm">
            <thead>
              <tr>
                <th>
                  ID: <span className="text-danger">{order?.id}</span>
                </th>
                <th>IMG</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={row.image} width={100} />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.quantity}</td>
                    <td>{(row.price * row.quantity).toLocaleString()}</td>
                  </tr>
                );
              })}
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  <b>Total: </b>
                </td>
                <td>
                  <b className="text-danger">
                    {orderDetail
                      .reduce((init, current) => {
                        let totalPerItem = current.price * current.quantity;
                        return (init += totalPerItem);
                      }, 0)
                      .toLocaleString()}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  }

  return <p className="display-4 font-italic text-center">No order yet!</p>;
};
