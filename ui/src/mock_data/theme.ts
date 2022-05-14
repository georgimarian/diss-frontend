import { Roles } from "utils/models/common.enums";


const userColors: { [key: string]: string } = {
    [Roles.TEACHER]: '#EEF5DB',
    [Roles.STUDENT]: '#E2EDED',
    [Roles.ADMIN]: '#EBF2F4'
}

export enum Colors {
    WARNING = '#EE6B61',
    ERROR = '#C73B63',
    YELLOW = '#FCCB87',
    LIGHT_YELLOW = '#FFECE4'
}
