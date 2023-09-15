import { createContext, useContext, useReducer } from "react";

const cartState = createContext();
const CartdispatchState = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    _id: action._id,
                    name: action.name,
                    category: action.category,
                    price: action.price,
                    image: action.image,
                    qty: action.qty
                },
            ];
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);

        case "UPDATE":
            return state.map((food) => {
                if (food._id === action._id) {
                    return {
                        ...food,
                        qty: action.qty,
                        price: action.price,
                    }
                }
                return food;
            });

        case "DROP":
            let emptyArr = []
            return emptyArr;

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartdispatchState.Provider value={dispatch}>
            <cartState.Provider value={state}>{children}</cartState.Provider>
        </CartdispatchState.Provider>
    );
};

// Create custom hooks to access the context values
export const useCart = () => {
    const context = useContext(cartState);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const useDispatch = () => {
    const context = useContext(CartdispatchState);
    if (context === undefined) {
        throw new Error("useDispatch must be used within a CartProvider");
    }
    return context;
};
