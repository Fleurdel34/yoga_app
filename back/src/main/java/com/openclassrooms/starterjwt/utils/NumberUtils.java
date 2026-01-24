package com.openclassrooms.starterjwt.utils;

public class NumberUtils {

    private NumberUtils(){}

    public static boolean isValidLong(String value){
        if(value == null || value.trim().isBlank()){
            return true;
        }

        try{
            Long.valueOf(value.trim());
                return false;
        }catch(NumberFormatException e){
                return true;
        }

    }
}
