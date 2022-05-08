import {Roles} from "../utils/roles";

const userColors: { [key: string]: string } = {
    [Roles.Teacher]: '#EEF5DB',
    [Roles.Student]: '#E2EDED',
    [Roles.Admin]: '#EBF2F4'
}

export enum Colors {
    WARNING = '#EE6B61',
    ERROR = '#C73B63',
    YELLOW = '#FCCB87',
    LIGHT_YELLOW = '#FFECE4'
}
