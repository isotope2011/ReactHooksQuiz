export const viewActions = ({ dispatch }) => {
    return {
        updateView: (view) => {
            dispatch({ type: "UPDATE_VIEW", view });
            dispatch({ type: "UPDATE_PAGE_VIEW", view });
        },
        resetView: () => {
            dispatch({ type: "RESET_VIEW" });
        },
    }
}
