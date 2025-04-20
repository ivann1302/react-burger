const OrderCounter = (props: any) => {
	return (
		<>
			<h3>{props.name}</h3>
			<h3>{props.count}</h3>
		</>
	);
};

export default OrderCounter;
