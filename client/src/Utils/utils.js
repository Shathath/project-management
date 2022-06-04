export const ClientUtils = 
{
	isEmptyString( str )
	{
		return typeof str !=="undefined" && str.trim().length == 0
	}
}