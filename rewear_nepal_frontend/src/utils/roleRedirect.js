export function getDashboardPath(role) {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "seller":
      return "/seller/dashboard";
    case "buyer":
    default:
      return "/buyer/dashboard";
  }
}
