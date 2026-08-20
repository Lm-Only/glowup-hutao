export const MAP_FILES = {
    "example1": "example2"
} as const;

export type MapKey = keyof typeof MAP_FILES;
export type MapPath = (typeof MAP_FILES)[MapKey];