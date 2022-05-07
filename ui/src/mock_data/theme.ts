import {ROLES} from "../utils/roles";

const userColors: { [key: string]: string } = {
    [ROLES.Teacher]: '#EEF5DB',
    [ROLES.Student]: '#E2EDED',
    [ROLES.Admin]: '#FFECE4'
}

export const theme = {
    userColors: userColors,
    accentColors: {
        warning: '#EE6B61',
        error: '#C73B63'
    }
}
