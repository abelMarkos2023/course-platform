const COUNTRY_HEADER_NAME = 'X-User-Country';

export function setUserCountryHeader(country:string|undefined,headers:Headers){

    if(country == null){
        headers.delete(COUNTRY_HEADER_NAME);
    }else{
        headers.set(COUNTRY_HEADER_NAME,country);
    }
}

