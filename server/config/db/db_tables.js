

export const createGroups = `
CREATE TABLE IF NOT EXISTS groups
(
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL,
    createdon timestamp NOT NULL DEFAULT now()
    );
    `;
    
export const user_confirmation = `
CREATE TABLE IF NOT EXISTS user_confirmation
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    confirmation_token VARCHAR(255) NOT NULL,
    is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
);
`;

export const createRoles = `
CREATE TABLE IF NOT EXISTS roles
(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    createdon timestamp NOT NULL DEFAULT now()
);
`;

export const createPermissions = `
CREATE TABLE IF NOT EXISTS permissions
(
    id SERIAL PRIMARY KEY,
    permission_name VARCHAR(255) NOT NULL,
    createdon timestamp NOT NULL DEFAULT now()
);
`;

export const createUsers = `
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    group_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    is_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    permissions TEXT [] NOT NULL,
    createdon timestamp NOT NULL DEFAULT now(),
    CONSTRAINT users_group_id_fkey FOREIGN KEY(group_id)
      REFERENCES groups(group_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT user_role_id_fkey FOREIGN KEY(role_id)
      REFERENCES roles(role_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
`;

export const seedPermissions = `
INSERT INTO permissions(id, permission_name) VALUES
(1, 'create master agents'),
(2, 'create village agent'),
(3, 'create farmers'),
(4, 'create editor'),
(5, 'create super admin')
`;

export const seedGroups = `
INSERT INTO groups(group_id, group_name) VALUES
(1, 'farmers'),
(2, 'village-agent'),
(3, 'master-agent')
`;

export const seedRoles = `
INSERT INTO roles(role_id, role_name) VALUES
(1, 'Super Admin'),
(2, 'Editor'),
(3, 'Public')
`;



