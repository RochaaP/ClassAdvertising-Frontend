export class RolesServiceURL {
    private static servicePrefix = 'api/';

    private static rolesExtension = RolesServiceURL.servicePrefix + 'userDetails/';

    public static CREAT_NOTE = RolesServiceURL.rolesExtension;


    /// Register ///
    public static registersUsers() {
        return RolesServiceURL.rolesExtension + 'common/register';
    }


    /// ADMIN ////
    public static viewUsers() {
        return RolesServiceURL.rolesExtension + 'common/getAll';
    }



}
