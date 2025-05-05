-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_user_admin(user_id_param TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  role_name TEXT;
BEGIN
  -- Get the role name for the user
  SELECT r.name INTO role_name
  FROM roles r
  JOIN user_roles ur ON r.id = ur.role_id
  WHERE ur.user_id = user_id_param;
  
  -- Return true if the role is Admin, false otherwise
  RETURN role_name = 'Admin';
END;
$$;