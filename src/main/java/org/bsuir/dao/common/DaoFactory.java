package org.bsuir.dao.common;

import org.bsuir.dao.helper.DaoManager;

public class DaoFactory {


   public static DaoManager createRestDaoManager(){
       return new DaoManager();
   }
}
