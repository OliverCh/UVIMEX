<?php
     session_start();
     header('Access-Control-Allow-Origin:*');
    //header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET');
    //header('Access-Control-Max-Age: 1000');
    //header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
    // include_once('wp-load.php');
    require($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $action=$_GET['actionAPI'];
    $arrayResponse=array();
    $coursesArray=[];
    $studentsArray=[];
    $instructorsArray=[];
    $user = wp_get_current_user();
    if ( !is_user_logged_in()) {
    array_push($arrayResponse, array('success' => 'false',
                                     'error' =>   'true'
                                     ));
    }else{
      switch($action){
        //this is used to show menu
        case 'changeUserInfo':
        $success="false";
        $error="false";
        if(isset( $user->ID) && $user->ID != $_GET['idUser']){
          array_push($arrayResponse, array('success' => $success,
                                   'error' =>   $error,
                                   'Msg','NotValidUser'));
                                   break;
        }
        $user_data = wp_update_user( array( 'ID' => $_GET['idUser'], 'display_name' => $_GET['name'], 'user_email' =>$_GET['email'] ) );
        if ( is_wp_error( $user_data ) ) {              // There was an error; possibly this user doesn't exist.
            $error='true';
        } else {
            // Success!
            $success= 'true.';
        }
        array_push($arrayResponse, array('success'      => $success,
                                         'error'        => $error,
                                         ));
          break;
        case 'getCurrentUserInfo':
        $userInfo=array( "user_id"  => $user ->ID,
                               "username"=> $user->display_name,
                               "user_nick"=> $user->user_nicename,
                               "user_email" => $user->user_email,
                               "user_registered" => $user->user_registered
        );
        array_push($arrayResponse, array('success'      => 'true',
                                         'error'        =>   'false',
                                         'userInfo' =>  $userInfo));
          break;
        //this is used to show menu
        case 'crookToBoss':
          $user_roles = $user->roles[0];
          var_dump( $user_roles);
          if( $user_roles == 'customer'){

            $user->set_role('author');
          }
          break;

        case "getGeneralStudentDashInfo":
          $results = $wpdb->get_results("SELECT
                                          t1.user_id,
                                          t3.user_login,
                                          t1.post_id,
                                          t1.updated_date as 'pay_Date',
                                          t1.meta_value,
                                          t2.post_status,
                                          t3.display_name as 'author',
                                          t2.post_title,
                                          t2.post_type,
                                          (SELECT count(distinct t2.post_author) FROM      wp_lifterlms_user_postmeta t1
                                                                                 LEFT JOIN wp_posts t2
                                                                                    ON  t1.post_id = t2.id
                                                                                    WHERE t1.meta_value= 'enrolled'
                                                                                    AND       t2.post_type='course'
                                                                                    AND t1.user_id='{$_GET['user']}'
                                          ) as 'instructorsCounter'
                                          FROM      wp_lifterlms_user_postmeta t1
                                          LEFT JOIN wp_posts t2
                                          ON        t1.post_id = t2.id
                                          LEFT JOIN wp_users t3
                                          ON        t2.post_author = t3.id
                                          WHERE t1.meta_value= 'enrolled'
                                          AND       t2.post_type='course'
                                          AND t1.user_id='{$_GET['user']}'
                                        ");

          if(!empty($results))
          {
              foreach($results as $row){
                      $newCourseArray=array( "user_id"  => $row ->user_id,
                                             "user_l"=> $row->user_login,
                                             "post_id"=> $row->post_id,
                                             "updated_date" => $row->pay_Date,
                                             "meta_value" => $row->meta_value,
                                             "post_status" => $row->post_status,
                                             "author" => $row->author,
                                             "post_title" => $row->post_title,
                                             "post_type" => $row->post_type,
                                             "instructorsCounter" => $row->instructorsCounter
                      );
                      array_push($coursesArray,$newCourseArray);
              }
          }
          array_push($arrayResponse, array('success' => 'true',
                                   'error' =>   'false',
                                   'coursesArray' =>  $coursesArray));

        break;
        case "getUserRole":
          $role = (array) $user->roles;
            array_push($arrayResponse, array('success' => 'true',
                                           'error' =>   'false',
                                           'userRole' => $role[0],
                                           'currentUser' =>  $user->display_name,
                                           'usrId' => isset( $user->ID ) ? (int) $user->ID : 0,
                                           'usernick' => isset($user->user_nicename) ? $user->user_nicename :0
                                           ));
         break;
          case "getGeneralDashInfo":
                         //counts how  many students do a instructor have globally
                         $results = $wpdb->get_results("SELECT count(t1.user_id) as 'totalStudents'
                                                               -- t3.user_login,
                                                               -- t2.id           AS 'post_id',
                                                               -- t1.updated_date,
                                                               -- t1.meta_value,
                                                               -- t2.post_status,
                                                               -- t3.display_name AS 'studentName',
                                                               -- t3.user_email,
                                                               -- t3.user_registered,
                                                               -- t2.post_title,
                                                               -- t4.user_login   'autor',
                                                               -- t2.post_type
                                                        FROM   wp_lifterlms_user_postmeta t1
                                                               LEFT JOIN wp_posts t2
                                                                      ON t1.post_id = t2.id
                                                               LEFT JOIN wp_users t3
                                                                      ON t1.user_id = t3.id
                                                               LEFT JOIN wp_users t4
                                                                      ON t4.id = t2.post_author
                                                        WHERE  t1.meta_value = 'enrolled'
                                                               AND t2.post_type = 'course'
                                                               AND t2.post_author = {$_GET['idUser']}"); //author=WP->userID
                          //Get all active courses by the instructor
                          $tempArrActiveCourses=[];
                          $ActiveCoursesArr=[];
                          $activeCourses = $wpdb->get_results("SELECT
                                                                      t1.id as 'id',
                                                                      t1.post_title 'title',
                                                                      t1.post_status as 'status',
                                                                      t1.post_modified as 'lastModWP',
                                                                      t1.post_name as 'nombreP'
                                                                      FROM   wp_posts t1
                                                                      WHERE  post_author = {$_GET['idUser']}
                                                                             AND post_type = 'course'
                                                                             AND post_status = 'publish' "); //author=WP->userID
                         //get totalSold Courses cusstom filter
                          $soldCoursesFilter=$wpdb->get_results("SELECT
                                                                         count(t1.user_id) as 'totalSold'
                                                                  FROM   wp_lifterlms_user_postmeta t1
                                                                         LEFT JOIN wp_posts t2
                                                                                ON t1.post_id = t2.id
                                                                         LEFT JOIN wp_users t3
                                                                                ON t1.user_id = t3.id
                                                                         LEFT JOIN wp_users t4
                                                                                ON t4.id = t2.post_author
                                                                  WHERE  t1.meta_value = 'enrolled'
                                                                         AND t2.post_type = 'course'
                                                                         AND t2.post_author = {$_GET['idUser']}
                                                                         AND ( updated_date BETWEEN '{$_GET['date1']}' AND '{$_GET['date2']}' )
                                                                         ");
                        //get new users that aint registered with that user b4
                        $newUsersFilter=$wpdb->get_results("SELECT count(t1.meta_id) as 'totalNewUsers'
                        FROM   wp_lifterlms_user_postmeta t1
                               JOIN wp_posts t2
                                 ON t1.post_id = t2.id
                               JOIN wp_users t3
                                      ON t1.user_id = t3.id
                               JOIN wp_users t4
                                      ON t4.id = t2.post_author
                        WHERE  t1.meta_value = 'enrolled'
                               AND t2.post_type = 'course'
                               AND t2.post_author = {$_GET['idUser']}
                                AND ( updated_date BETWEEN '{$_GET['date1']}' AND '{$_GET['date2']}' )
                               AND t3.user_login NOT IN (SELECT t3.user_login
                                                         FROM   wp_lifterlms_user_postmeta t1
                        					                              JOIN wp_posts t2
                                                                  ON t1.post_id = t2.id
                                                                JOIN wp_users t3
                                                                       ON t1.user_id = t3.id
                                                                JOIN wp_users t4
                                                                       ON t4.id = t2.post_author
                                                         WHERE  t1.meta_value = 'enrolled'
                                                                AND t2.post_type = 'course'
                                                                AND t2.post_author = {$_GET['idUser']}
                                                                AND t1.updated_date < '{$_GET['date2']}' ) ");

                        //here we get all instructors ids from woocommerce that were  created on wordpress
                        $productIds='';
                        $incomeWithdraw=0;
                        $totalBalance=0;
                        $getAllInstructorProductsIdWoocommerceWordpress=$wpdb->get_results("SELECT DISTINCT t2.meta_value as 'idProduct',
                                                                                                            t6.post_title
                                                                                            FROM   wp_woocommerce_order_items t1
                                                                                             JOIN wp_woocommerce_order_itemmeta t2
                                                                                               ON t1.order_item_id = t2.order_item_id
                                                                                             JOIN wp_posts t3
                                                                                               ON t3.id = t1.order_id
                                                                                             LEFT JOIN wp_postmeta t4
                                                                                                    ON t3.id = t4.post_id
                                                                                             JOIN (SELECT Substring(meta_value, 10, Length(meta_value)) AS order_id,
                                                                                                              user_id,
                                                                                                              post_id,
                                                                                                              meta_key,
                                                                                                              meta_value
                                                                                                       FROM   wp_lifterlms_user_postmeta
                                                                                                       WHERE  meta_key = '_enrollment_trigger') t5
                                                                                                   ON t5.order_id = t1.order_id
                                                                                             JOIN wp_posts t6
                                                                                               ON t6.id = t5.post_id
                                                                                             JOIN wp_users t7
                                                                                               ON t7.id = t6.post_author
                                                                                            WHERE  ( t2.meta_key = '_product_id' )
                                                                                                 AND t3.post_type = 'shop_order'
                                                                                                 AND t4.meta_key = '_order_total'
                                                                                                 AND t6.post_author = {$_GET['idUser']}"
                                                                                          );
                          if(!empty($getAllInstructorProductsIdWoocommerceWordpress)){
                            foreach ($getAllInstructorProductsIdWoocommerceWordpress as $key => $value) {
                                if($key === key($getAllInstructorProductsIdWoocommerceWordpress)){
                                  $productIds.=$value->idProduct;
                                  continue;
                                }
                                $productIds.=$value->idProduct.',';
                            }
                            if($productIds!=''){
                              //get all woocommerce incomeWithdraw
                              $incomeWithdraw=$wpdb->get_results("SELECT order_item_meta_2.meta_value    AS product_id,
                                                                         FORMAT(Sum(order_item_meta.meta_value),3) AS line_total
                                                                  FROM   wp_woocommerce_order_items AS order_items
                                                                  LEFT JOIN wp_woocommerce_order_itemmeta AS order_item_meta
                                                                    ON order_items.order_item_id = order_item_meta.order_item_id
                                                                   LEFT JOIN wp_woocommerce_order_itemmeta AS order_item_meta_2
                                                                    ON order_items.order_item_id = order_item_meta_2.order_item_id
                                                                   LEFT JOIN wp_posts AS posts
                                                                    ON order_items.order_id = posts.id
                                                                  WHERE  posts.post_type = 'shop_order'
                                                                     AND posts.post_date BETWEEN '{$_GET['date1']}' AND '{$_GET['date2']}'
                                                                     AND posts.post_status IN ( 'wc-completed' )
                                                                     AND order_items.order_item_type = 'line_item'
                                                                     AND order_item_meta.meta_key = '_line_total'
                                                                     AND order_item_meta_2.meta_key = '_product_id'
                                                                     AND order_item_meta_2.meta_value IN( {$productIds} )
                                                                  GROUP  BY order_item_meta_2.meta_value; ");

                              //check when 2 products are sold
                              $totalBalance=$wpdb->get_results("SELECT order_item_meta_2.meta_value    AS product_id,
                                                                       FORMAT(Sum(order_item_meta.meta_value),3) AS line_total
                                                                FROM   wp_woocommerce_order_items AS order_items
                                                                LEFT JOIN wp_woocommerce_order_itemmeta AS order_item_meta
                                                                  ON order_items.order_item_id = order_item_meta.order_item_id
                                                                LEFT JOIN wp_woocommerce_order_itemmeta AS order_item_meta_2
                                                                  ON order_items.order_item_id = order_item_meta_2.order_item_id
                                                                LEFT JOIN wp_posts AS posts
                                                                  ON order_items.order_id = posts.id
                                                                WHERE  posts.post_type = 'shop_order'
                                                                   AND posts.post_date
                                                                   AND posts.post_status IN ( 'wc-completed' )
                                                                   AND order_items.order_item_type = 'line_item'
                                                                   AND order_item_meta.meta_key = '_line_total'
                                                                   AND order_item_meta_2.meta_key = '_product_id'
                                                                   AND order_item_meta_2.meta_value IN( {$productIds} )
                                                                GROUP  BY order_item_meta_2.meta_value; ");
                            }
                          }
                          if(!empty($results))
                          {
                              //activeCourseInfo
                              foreach ($activeCourses as $row) {
                                $tempArrActiveCourses['id']=$row->id;
                                $tempArrActiveCourses['title']=$row->title;
                                $tempArrActiveCourses['nombreP']=$row->nombreP;
                                $tempArrActiveCourses['status']=$row->status;
                                $tempArrActiveCourses['lastModWP']=$row->lastModWP;
                                $ActiveCoursesArr[]=$tempArrActiveCourses;
                              }
                              //
                              //this will allways expects 1 row so that's why we save this at the end
                              foreach($results as $row){
                                array_push($arrayResponse, array('success' => 'true',
                                                         'error' =>   'false',
                                                         'totalStudents' =>  $row->totalStudents,
                                                         'activeCourses' =>  $ActiveCoursesArr,
                                                         'totalSoldCourses'     =>  $soldCoursesFilter[0]->totalSold,
                                                         'totalNewUsers' => $newUsersFilter[0]->totalNewUsers,
                                                         'incomeWithdraw' =>$incomeWithdraw && $incomeWithdraw[0]->line_total ? $incomeWithdraw[0]->line_total : 0,
                                                         'totalBalance'=>$totalBalance && $totalBalance[0]->line_total ? $totalBalance[0]->line_total : 0
                                                          ));
                              }
                          }

                          // GET USER ORDERS (COMPLETED + PROCESSING)
                          $customer_orders = get_posts( array(
                              'numberposts' => -1,
                              'meta_key'    => '_customer_user',
                              'meta_value'  => 831, //puesto por mi es el id de la orden (order_item_id de  la tabla wp_woocommerce_order_itemmeta)
                              'post_type'   => wc_get_order_types(),
                              'post_status' => array_keys( wc_get_is_paid_statuses() ),
                          ) );

                          // LOOP THROUGH ORDERS AND GET PRODUCT IDS
                          // if ( ! $customer_orders ) return;
                          // $productInfo = array();
                          // $tempArr=array();
                          // foreach ( $customer_orders as $customer_order ) {
                          //     $order = wc_get_order( $customer_order->ID );
                          //     $items = $order->get_items();
                          //     foreach ( $items as $item ) {
                          //         $product = $item->get_product();
                          //         var_dump($product->post);
                          //         //var_dump($product);
                          //         $tempArr['productID']       = $item->get_product_id();
                          //         $tempArr['productName']     = $product->get_name();
                          //         $tempArr['productQuantity'] = $item->get_quantity();
                          //         $tempArr['productSold']     = $item->get_total();
                          //         $tempArr['date']=$order->order_date;
                          //         $productInfo[]=$tempArr;
                          //     }
                          // }
                          // $productInfo = array_unique( $productInfo );
                          // var_dump($productInfo);

                        //this works
                        // $query = new WC_Order_Query( array(
                        //     'limit' => 10,
                        //     'orderby' => 'date',
                        //     'order' => 'DESC',
                        //     'return' => 'ids',
                        // ) );
                        // $orders = $query->get_orders();
                        // var_dump($orders);

                        // $order = wc_get_order( 1 );
                        // // retrieve the items associated with that order
                        // var_dump($order);
                        // $order_items = $order->get_items();
                        // // dump the array of returned  items
                        // var_dump($order_items);


                        // $_product = wc_get_product( 89 );
                        // $_product->get_regular_price();
                        // $_product->get_sale_price();
                        // $_product->get_price();
                        // var_dump($_product);
                        // array_push($arrayResponse, array('success' => 'true',
                        //                          'error' =>   'false',
                        //                          'coursesArray' =>  ''));

        break;
        case "getUserCourses":

          if(isset( $user->ID) && $user->ID != $_GET['user']){
            array_push($arrayResponse, array('success' => 'false',
                                     'error' =>   'true',
                                     'Msg','NotValidUsr'));
                                     break;
          }
                      $results = $wpdb->get_results("SELECT
                                                      t1.user_id,
                                                      t3.user_login ,
                                                      t1.post_id,
                                                      t1.updated_date as 'pay_Date',
                                                      t1.meta_value,
                                                      t2.post_status,
                                                      t3.display_name,
                                                      t2.post_title,
                                                      t2.post_type,
                                                      t4.display_name as 'author',
                                                      t4.id as 'idAuth'
                                                      FROM      wp_lifterlms_user_postmeta t1
                                                      LEFT JOIN wp_posts t2
                                                      ON        t1.post_id = t2.id
                                                      LEFT JOIN wp_users t3
                                                      ON        t1.user_id = t3.id
                                                      LEFT JOIN wp_users t4
                                                      ON        t4.id=t2.post_author
                                                      WHERE t1.meta_value= 'enrolled'
                                                      AND       t2.post_type='course'
                                                      AND t3.id='{$_GET['user']}';
                                                    ");

                      if(!empty($results))
                      {
                          foreach($results as $row){
                                  $newCourseArray=array( "stId"  => $row ->user_id,
                                                         "user_l"=> $row->user_login,
                                                         "post_id"=> $row->post_id,
                                                         "pay_Date" => $row->pay_Date,
                                                         "meta_value" => $row->meta_value,
                                                         "post_status" => $row->post_status,
                                                         "display_name" => $row->display_name,
                                                         "post_title" => $row->post_title,
                                                         "post_type" => $row->post_type,
                                                         "idAuth" => $row->idAuth,
                                                         "author" => $row->author
                                  );
                                  array_push($coursesArray,$newCourseArray);
                          }
                      }
                      array_push($arrayResponse, array('success' => 'true',
                                               'error' =>   'false',
                                               'coursesArray' =>  $coursesArray));
                  break;
                  case "getUserCoursesArr":
                                $results = $wpdb->get_results("SELECT
                                                                t1.user_id,
                                                                t3.user_login ,
                                                                t1.post_id,
                                                                t1.updated_date as 'pay_Date',
                                                                t1.meta_value,
                                                                t2.post_status,
                                                                t3.display_name,
                                                                t2.post_title,
                                                                t2.post_type,
                                                                t4.display_name as 'author',
                                                                t4.id as 'idAuth'
                                                                FROM      wp_lifterlms_user_postmeta t1
                                                                LEFT JOIN wp_posts t2
                                                                ON        t1.post_id = t2.id
                                                                LEFT JOIN wp_users t3
                                                                ON        t1.user_id = t3.id
                                                                LEFT JOIN wp_users t4
                                                                ON        t4.id=t2.post_author
                                                                WHERE t1.meta_value= 'enrolled'
                                                                AND       t2.post_type='course'
                                                                AND t3.id='{$_GET['user']}';
                                                              ");

                                if(!empty($results))
                                {
                                    foreach($results as $row){
                                            $newCourseArray=array( "stId"  => $row ->user_id,
                                                                   "user_l"=> $row->user_login,
                                                                   "post_id"=> $row->post_id,
                                                                   "pay_Date" => $row->pay_Date,
                                                                   "meta_value" => $row->meta_value,
                                                                   "post_status" => $row->post_status,
                                                                   "display_name" => $row->display_name,
                                                                   "post_title" => $row->post_title,
                                                                   "post_type" => $row->post_type,
                                                                   "idAuth" => $row->idAuth,
                                                                   "author" => $row->author
                                            );
                                            array_push($coursesArray,$newCourseArray);
                                    }
                                }
                                array_push($arrayResponse, array('success' => 'true',
                                                         'error' =>   'false',
                                                         'coursesArray' =>  $coursesArray));
                            break;
                  case "getInstructorCourses":
                                $results = $wpdb->get_results("SELECT  t2.id,
                                                                       t2.post_status,
                                                                       t2.post_title 'autor',
                                                                       t2.post_type,
                                                                       t3.display_name
                                                                FROM   wp_posts t2
                                                                       LEFT JOIN wp_users t3
                                                                       ON t2.post_author = t3.id
                                                                WHERE  t2.post_type = 'course'
                                                                       AND t3.id = {$_GET['user']}
                                                                ORDER  BY user_login;
                                                              ");

                                if(!empty($results))
                                {
                                    foreach($results as $row){
                                            $newCourseArray=array( "idCursoWordpress"  => $row ->id,
                                                                   "statusPost"=> $row->post_status,
                                                                   "author" => $row->autor,
                                                                   "tipo" => $row->post_type
                                            );
                                            array_push($coursesArray,$newCourseArray);
                                    }
                                }

                                $userArray = (array) $user;
                                array_push($arrayResponse, array('success' => 'true',
                                                         'error' =>   'false',
                                                         'coursesArray' =>  $coursesArray, 'userData' => $userArray['data']));
            break;
            case "getStudentsListCourses":
            $results = $wpdb->get_results("SELECT
                                            t1.user_id,
                                            t3.user_login as 'user_l',
                                            t3.user_nicename as 'user_n',
                                            t1.post_id,
                                            t1.updated_date 'payDate',
                                            t1.meta_value,
                                            t2.post_status,
                                            t3.display_name as 'studentName',
                                            t3.user_email as 'studentEmail',
                                            t3.user_registered as 'registeredDate',
                                            t2.post_title as 'courseTitle',
                                            t4.user_login as 'author' ,
                                            t2.post_type as 'tipo'
                                            FROM      wp_lifterlms_user_postmeta t1
                                            LEFT JOIN wp_posts t2
                                            ON        t1.post_id = t2.id
                                            LEFT JOIN wp_users t3
                                            ON t1.user_id = t3.id
                                            LEFT JOIN wp_users t4
                                            ON        t4.id=t2.post_author
                                            where     t1.meta_value= 'enrolled'
                                            AND       t2.post_type='course'
                                            AND       t2.post_author={$_GET['authorCourse']};
                                          ");
            if(!empty($results))
            {
                foreach($results as $row){
                        $newStudentsArray=array( "user_id"  => $row ->user_id,
                                               "user_l"=> $row->user_l,
                                               "post_id"=> $row->post_id,
                                               "payDate" => $row->payDate,
                                               "meta_value" => $row->meta_value,
                                               "post_status" => $row->post_status,
                                               "studentName" => $row->studentName,
                                               "studentEmail" => $row->studentEmail,
                                               "stundentNick" => $row->user_n,
                                               "registeredDate" => $row->registeredDate,
                                               "courseTitle" => $row->courseTitle,
                                               "author" => $row->author,
                                               "tipo" => $row->tipo
                        );
                        array_push($studentsArray,$newStudentsArray);
                }
            }
            array_push($arrayResponse, array('success' => 'true',
                                         'error' =>   'false',
                                         'studentsArray' =>  $studentsArray
                                       ));
        break;
        case "getInstructorsList":
          $results = $wpdb->get_results("SELECT  t3.user_nicename as 'usernice',
                                                 t3.display_name,
                                                 t3.id ,
                                                 t3.user_email AS 'email',
                                                 t4.meta_value AS 'type_User',
                                                 t5.meta_value AS 'phoneNumber'
                                          FROM   wp_lifterlms_user_postmeta t1
                                          JOIN   wp_posts t2
                                            ON t1.post_id=t2.id
                                          JOIN wp_users t3
                                            ON t2.post_author=t3.id
                                          JOIN   wp_usermeta t4
                                          ON     t3.id=t4.user_id
                                          JOIN   wp_usermeta t5
                                          ON     t3.id=t5.user_id
                                          WHERE  t4.meta_key='wp_capabilities'
                                          AND    t4.meta_value='a:1:{s:6:\"author\";b:1;}'
                                          AND    t5.meta_key='llms_phone'
                                          AND    t1.user_id={$_GET['usrId']}
                                          AND    t1.meta_value= 'enrolled'
                                        ");
        if(!empty($results))
        {
            foreach($results as $row){
                    $newInstructorsArray=array(
                                           "user_id"  => $row ->id,
                                           "usernice" => $row->usernice,
                                           "userName"=> $row->display_name,
                                           "email"=> $row->email,
                                           "type_User" => $row->type_User,
                                           "phoneNumber" => $row->phoneNumber
                    );
                    array_push($instructorsArray,$newInstructorsArray);
            }
        }
        array_push($arrayResponse, array('success' => 'true',
                                         'error' =>   'false',
                                         'instructorsArray' =>  $instructorsArray
                                   ));
        break;
        case "getInstructorsListForAdmin":
            $results = $wpdb->get_results("SELECT t1.user_nicename as 'usernice',
                                                   t1.display_name,
                                                   t1.id ,
                                                   t1.user_email AS 'email',
                                                   t2.meta_value AS 'type_User',
                                                   t3.meta_value AS 'phoneNumber'
                                            FROM   wp_users t1
                                            JOIN   wp_usermeta t2
                                            ON     t1.id=t2.user_id
                                            JOIN   wp_usermeta t3
                                            ON     t2.user_id=t3.user_id
                                            AND    t3.meta_key='llms_phone'
                                            WHERE  t2.meta_key='wp_capabilities'
                                            AND    t2.meta_value='a:1:{s:6:\"author\";b:1;}'
                                          ");
          if(!empty($results))
          {
              foreach($results as $row){
                      $newInstructorsArray=array(
                                             "user_id"  => $row ->id,
                                             "usernice" => $row->usernice,
                                             "userName"=> $row->display_name,
                                             "email"=> $row->email,
                                             "type_User" => $row->type_User,
                                             "phoneNumber" => $row->phoneNumber
                      );
                      array_push($instructorsArray,$newInstructorsArray);
              }
          }
          array_push($arrayResponse, array('success' => 'true',
                                           'error' =>   'false',
                                           'instructorsArray' =>  $instructorsArray
                                     ));
          break;
          case "getUserInfo":
          if(isset($_GET['users']) && count($_GET['users'])>0){
            $users='';
            foreach ($_GET['users'] as $key => $value) {
              if(($key+1) == count($_GET['users'])){
                $users.=$value['autor'];
              }else{
                $users.=$value['autor'].',';
              }
            }
            $results = $wpdb->get_results("SELECT  t1.user_nicename as 'usernice',
                                                   t1.display_name,
                                                   t1.id ,
                                                   t1.user_email AS 'email',
                                                   t2.meta_value AS 'type_User',
                                                   t3.meta_value AS 'phoneNumber'
                                            FROM   wp_users t1
                                            JOIN   wp_usermeta t2
                                            ON     t1.id=t2.user_id
                                            JOIN   wp_usermeta t3
                                            ON     t2.user_id=t3.user_id
                                            AND    t3.meta_key='llms_phone'
                                            WHERE  t2.meta_key='wp_capabilities'
                                            AND    t2.meta_value='a:1:{s:6:\"author\";b:1;}'
                                            AND    t1.id in ($users)
                                          ");
            $resultsArrayConverted=json_decode(json_encode($results), True);
            $instructorsArrayInfo=[];
            $temporalArrayInfo=[];
            $finalInstructorsArray=[];
            $temporalInstructorsArray=[];
            if(count($results)>0){
              foreach ($_GET['users'] as $key => $value) {
                  $keyFound = array_search($value["autor"], array_column($resultsArrayConverted, 'id'));
                  if($keyFound!=false){
                    $temporalArrayInfo['usernameAuthor']=$keyFound!=false ? $resultsArrayConverted[$keyFound]["display_name"] : '';
                    $temporalArrayInfo['idAutor']=$keyFound!=false ? $resultsArrayConverted[$keyFound]["id"] : '';
                    $temporalArrayInfo['email']=$keyFound!=false ? $resultsArrayConverted[$keyFound]["email"] : '';
                    $temporalArrayInfo['idWPUvimex' ] = $value["idWPUvimex"];
                    $temporalArrayInfo['idCursoWP']   = $value["idCursoWP"];
                    $temporalArrayInfo['urlModulos']  = $value["urlModulos"];
                    $temporalArrayInfo['nombreCurso'] = $value["nombreCurso"];
                    $instructorsArrayInfo[]= $temporalArrayInfo;

                  //  starts instructors array fill
                      $temporalInstructorsArray['idAutor']=$keyFound!=false ? $resultsArrayConverted[$keyFound]["id"] : '';
                      $temporalInstructorsArray['usernameAuthor']=$keyFound!=false ? $resultsArrayConverted[$keyFound]["display_name"] : '';
                      $finalInstructorsArray[]=$temporalInstructorsArray;
                  }
              }
            }
            array_push($arrayResponse, array('success' => 'true',
                                             'error' =>   'false',
                                             'instructorsArrayInfo' =>  $instructorsArrayInfo,
                                             'instructorsArray' => array_unique($finalInstructorsArray, SORT_REGULAR)
                                       ));
          }
          break;
      }
    }

    header('Content-Type: application/json');
    echo json_encode($arrayResponse,JSON_PRETTY_PRINT);

    /**
 * Get All orders IDs for a given product ID.
 *
 * @param  integer  $product_id (required)
 * @param  array    $order_status (optional) Default is 'wc-completed'
 *
 * @return array
 */
function get_orders_ids_by_product_id( $product_id, $order_status = array( 'wc-completed' ) ){
    global $wpdb;

    $results = $wpdb->get_col("
        SELECT order_items.order_id
        FROM {$wpdb->prefix}woocommerce_order_items as order_items
        LEFT JOIN {$wpdb->prefix}woocommerce_order_itemmeta as order_item_meta ON order_items.order_item_id = order_item_meta.order_item_id
        LEFT JOIN {$wpdb->posts} AS posts ON order_items.order_id = posts.ID
        WHERE posts.post_type = 'shop_order'
        AND posts.post_status IN ( '" . implode( "','", $order_status ) . "' )
        AND order_items.order_item_type = 'line_item'
        AND order_item_meta.meta_key = '_product_id'
        AND order_item_meta.meta_value = '$product_id'
    ");

    return $results;
}
