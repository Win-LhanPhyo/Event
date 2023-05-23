import { createTheme } from "@mui/material/styles";

export const eventTheme = createTheme({
    palette: {
        primary: {
            main: "#3B91D1",
            light: "#24A6F7",
            dark: "#1A67A0",
        },
        secondary: {
            main: "#39546C",
            light: "#6B83A0",
            dark: "#032136",
        },
        error: {
            main: "#EA2C24",
            light: "#FF4038",
            dark: "#9F110B",
        },
        warning: {
            main: "#FA6710",
            light: "#FF9B26",
            dark: "#A5440A",
        },
        info: {
            main: "#DD468F",
            light: "#FF54A9",
            dark: "#404040",
        },
        success: {
            main: "#1FC46E",
            light: "#C8FFDF",
            dark: "#00A683",
        },
        text: {
            primary: "#393939",
            secondary: "#D6D6D6",
            disabled: "#B1B1B1",
        }
    }
});

