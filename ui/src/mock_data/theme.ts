import {ROLES} from "../utils/roles";

const userColors: { [key: string]: string } = {
    [ROLES.Teacher]: '#EEF5DB',
    [ROLES.Student]: '#E2EDED',
    [ROLES.Admin]: '#EBF2F4'
}

export enum Colors {
    WARNING = '#EE6B61',
    ERROR = '#C73B63',
    YELLOW = '#FCCB87',
    LIGHT_YELLOW = '#FFECE4'
}
