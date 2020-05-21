export class RolesServiceURL {
    private static servicePrefix = 'api/';

    private static rolesExtension = RolesServiceURL.servicePrefix + 'userDetails/';

    public static CREAT_NOTE = RolesServiceURL.rolesExtension;


    /// ADMIN ///

    public static viewUsers() {
        return RolesServiceURL.rolesExtension + 'common/getAll';
    }

}
