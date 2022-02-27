import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:touchofbeauty_flutter/services/cart_provider.dart';
import 'package:touchofbeauty_flutter/services/get_appointment_services.dart';
import 'package:touchofbeauty_flutter/services/time_provider.dart';

class AppointmentPage extends StatefulWidget {
  const AppointmentPage({Key? key}) : super(key: key);

  @override
  _AppointmentPageState createState() => _AppointmentPageState();
}

class _AppointmentPageState extends State<AppointmentPage> {
  @override
  void initState() {
    Provider.of<GetAppointment>(context, listen: false).getAppoint(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final time = Provider.of<TimeProvider>(context);
    return Scaffold(
        appBar: AppBar(
            title: const Text('Appointment'),
            centerTitle: true,
            leading: IconButton(
              onPressed: () {
                Navigator.pushNamed(context, '/dashboard');
                Provider.of<GetAppointment>(context, listen: false)
                    .value
                    ?.clear();
                Provider.of<CartProvider>(context).lst.clear();
              },
              icon: const Icon(
                Icons.arrow_back,
                color: Colors.white,
              ),
            ),
            backgroundColor: Color(0xFFde8735)),
        body: SingleChildScrollView(
          child: Consumer<GetAppointment>(
            builder: (context, value, child) {
              const Center(child: CircularProgressIndicator());
              if (value.value?.isEmpty == true) {
                return const Center(
                    child: Text("No Appointment has been booked"));
              } else {
                return SingleChildScrollView(
                  physics: NeverScrollableScrollPhysics(),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(
                            top: 16.0, left: 10, right: 10, bottom: 8),
                        child: Card(
                          color: Color(0xFFde8735),
                          elevation: 5,
                          child: Container(
                            margin: const EdgeInsets.all(8),
                            width: double.infinity,
                            child: const Text(
                              "All the Appointment booked by you.",
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 20,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ),
                      ...value.value!.map((e) => SingleChildScrollView(
                            physics: const NeverScrollableScrollPhysics(),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Card(
                                elevation: 20,
                                child: Container(
                                  margin: const EdgeInsets.all(10),
                                  child: Column(
                                    children: [
                                      Text(
                                        "Booked Date: ${time.getDate((e.adate).toString())}",
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),

                                      Text(
                                        "Booked Time: ${e.atime}",
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),

                                      space(),
                                      const Padding(
                                        padding:
                                            EdgeInsets.symmetric(horizontal: 8),
                                        child: Align(
                                          alignment: Alignment.centerLeft,
                                          child: Text(
                                            "Booked Services",
                                            style: TextStyle(
                                              fontSize: 18,
                                              color: Colors.black87,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          ),
                                        ),
                                      ),
                                      for (var data in e.service!)

                                        // for (int i = 0;
                                        //     i < value.value!.length;
                                        //     i++)
                                        //   for (var data
                                        //       in value.value![i].service!)
                                        Padding(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8),
                                          child: Align(
                                            alignment: Alignment.centerLeft,
                                            child: Text(
                                              (data.sname).toString(),
                                              style: const TextStyle(
                                                  fontSize: 16,
                                                  color: Colors.black),
                                              // "Booked Services: ${value.value?[index].service?.length}"
                                            ),
                                          ),
                                        ),

                                      space(),

                                      // SizedBox(
                                      //   width: double.infinity,
                                      //   child: Text(
                                      //     "Booked By: ${value.value?[index].cid?.username}",
                                      //     textAlign: TextAlign.right,
                                      //     style: TextStyle(
                                      //       fontSize: 12,
                                      //       color: Colors.black87,
                                      //     ),
                                      //   ),
                                      // ),
                                      space(),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ))
                      // ListView.builder(
                      //     physics: const BouncingScrollPhysics(),
                      //     shrinkWrap: true,
                      //     itemCount: value.value?.length,
                      //     itemBuilder: (BuildContext context, int index) {
                      //       if (value.value?.length == null ||
                      //           value.value?.isEmpty == true) {
                      //         return Container(
                      //           margin: const EdgeInsets.all(10),
                      //           child: const Text("No Appointment"),
                      //         );
                      //       } else {
                      //         return Padding(
                      //           padding: const EdgeInsets.all(8.0),
                      //           child: Card(
                      //             elevation: 20,
                      //             child: Container(
                      //               margin: const EdgeInsets.all(10),
                      //               child: Column(
                      //                 children: [
                      //                   Text(
                      //                     "Booked Date: ${time.getDate((value.value?[index].adate).toString())}",
                      //                     style: const TextStyle(
                      //                       fontSize: 16,
                      //                     ),
                      //                   ),

                      //                   Text(
                      //                     "Booked Time: ${value.value?[index].atime}",
                      //                     style: const TextStyle(
                      //                       fontSize: 16,
                      //                     ),
                      //                   ),

                      //                   Text(
                      //                     "Booked Services: ${value.value?[index].service?[index].sname}",
                      //                     style: TextStyle(
                      //                         fontSize: 16,
                      //                         color: Colors.purple[800]),
                      //                   ),

                      //                   space(),
                      //                   const Padding(
                      //                     padding:
                      //                         EdgeInsets.symmetric(horizontal: 8),
                      //                     child: Align(
                      //                       alignment: Alignment.centerLeft,
                      //                       child: Text(
                      //                         "Booked Services",
                      //                         style: TextStyle(
                      //                           fontSize: 18,
                      //                           color: Colors.black87,
                      //                           fontWeight: FontWeight.w500,
                      //                         ),
                      //                       ),
                      //                     ),
                      //                   ),
                      //                   // Text(
                      //                   //   (value.value?[index].service?[2].sname)
                      //                   //       .toString(),
                      //                   // ),
                      //                   for (int i = 0;
                      //                       i < value.value!.length;
                      //                       i++)
                      //                     for (var data
                      //                         in value.value![i].service!)
                      //                       Padding(
                      //                         padding: const EdgeInsets.symmetric(
                      //                             horizontal: 8),
                      //                         child: Align(
                      //                           alignment: Alignment.centerLeft,
                      //                           child: Text(
                      //                             (data.sname).toString(),
                      //                             style: const TextStyle(
                      //                                 fontSize: 16,
                      //                                 color: Colors.black),
                      //                             // "Booked Services: ${value.value?[index].service?.length}"
                      //                           ),
                      //                         ),
                      //                       ),
                      //                   // for(var data in value.value.)

                      //                   // ListView.builder(
                      //                   //     physics:
                      //                   //         const BouncingScrollPhysics(),
                      //                   //     shrinkWrap: true,
                      //                   //     itemCount: value
                      //                   //         .value?[index].service?.length
                      //                   //         .compareTo(0),
                      //                   //     itemBuilder: (BuildContext context,
                      //                   //         int index) {
                      //                   //       if (value.value?[index].service
                      //                   //                   ?.length ==
                      //                   //               null ||
                      //                   //           value.value?[index].service
                      //                   //                   ?.isEmpty ==
                      //                   //               true) {
                      //                   //         return Container(
                      //                   //           margin:
                      //                   //               const EdgeInsets.all(10),
                      //                   //           child:
                      //                   //               const Text("No Services"),
                      //                   //         );
                      //                   //       } else if (value.value?[index]
                      //                   //               .service?.isNotEmpty ==
                      //                   //           true) {
                      //                   // return Padding(
                      //                   //   padding:
                      //                   //       const EdgeInsets.symmetric(
                      //                   //           horizontal: 8),
                      //                   //   child: Align(
                      //                   //     alignment:
                      //                   //         Alignment.centerLeft,
                      //                   //     child: Text(
                      //                   //       (value
                      //                   //               .value?[index]
                      //                   //               .service?[index]
                      //                   //               .sname)
                      //                   //           .toString(),
                      //                   //       style: const TextStyle(
                      //                   //           fontSize: 16,
                      //                   //           color: Colors.black),
                      //                   //       // "Booked Services: ${value.value?[index].service?.length}"
                      //                   //     ),
                      //                   //   ),
                      //                   // );
                      //                   //       } else {
                      //                   //         return Container();
                      //                   //       }
                      //                   //     }),

                      //                   space(),

                      //                   SizedBox(
                      //                     width: double.infinity,
                      //                     child: Text(
                      //                       "Booked By: ${value.value?[index].cid?.username}",
                      //                       textAlign: TextAlign.right,
                      //                       style: TextStyle(
                      //                         fontSize: 12,
                      //                         color: Colors.black87,
                      //                       ),
                      //                     ),
                      //                   ),
                      //                   space(),
                      //                 ],
                      //               ),
                      //             ),
                      //           ),
                      //         );
                      //       }
                      //     }),
                    ],
                  ),
                );
              }
            },
          ),
        )

        // Padding(
        //   padding: EdgeInsets.all(30),
        //   child: Column(
        //     mainAxisAlignment: MainAxisAlignment.center,
        //     children: [
        //       ElevatedButton(
        //           onPressed: () {},
        //           child: const Text('Confirm Booking'),
        //           style: ElevatedButton.styleFrom(
        //               primary: Colors.deepOrange, onPrimary: Colors.deepOrange))
        //     ],
        //   ),
        // ),
        );
  }

  SizedBox space() => SizedBox(height: 10);
}
