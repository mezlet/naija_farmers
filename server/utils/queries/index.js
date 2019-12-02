export const creatUser = `
INSERT INTO users 
(username, email, password, group_id, role_id, permissions) 
VALUES
($1, $2, $3, $4, $5, $6) 
returning 
id, email, username, is_confirmed
`;
export const login = `
SELECT users.username, users.email, users.id, users.is_confirmed, users.password, roles.role_name 
FROM users
JOIN roles ON users.role_id = roles.role_id
WHERE email=$1
`;

export const getUser = `
SELECT users.username, users.email, users.permissions, groups.group_name, roles.role_name 
from users
JOIN groups ON users.group_id = groups.group_id
JOIN roles ON users.role_id = roles.role_id
where email=$1
`;

export const getPermissions = `
SELECT * from permissions
`;

export const setToken = `
INSERT INTO user_confirmation 
(username, email, is_confirmed, confirmation_token)
VALUES
($1, $2, $3, $4 )
RETURNING *
`;

export const verifyConfirmation = `
SELECT * FROM user_confirmation 
WHERE confirmation_token = $1
`;

export const ConfirmUser = `
UPDATE user_confirmation
SET is_confirmed = true
WHERE confirmation_token = $1
AND is_confirmed = false
RETURNING *
`;

export const updateUser = `
UPDATE users
SET is_confirmed = true 
WHERE email = $1
RETURNING 
id, username, email, is_confirmed
`;