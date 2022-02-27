import 'dart:async';
import 'package:flutter/material.dart';
import 'package:motion_toast/motion_toast.dart';
import 'package:provider/provider.dart';
import 'package:touchofbeauty_flutter/models/categorymodel.dart';
import 'package:touchofbeauty_flutter/models/servicemodel.dart';
import 'package:touchofbeauty_flutter/screens/services.dart';
import 'package:touchofbeauty_flutter/services/get_categories_services.dart';
import 'package:touchofbeauty_flutter/utils/config.dart';
import 'package:touchofbeauty_flutter/widgets/drawer.dart';
import 'package:proximity_sensor/proximity_sensor.dart';
import 'package:flutter/foundation.dart' as foundation;

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _isNear = false;
  // late StreamSubscription<dynamic> _streamSubscription;
  late List<CategoryModel> categoryList;
  late List<AllServicesModel> allserviceList;

  @override
  void initState() {
    super.initState();
    listenSensor();
  }

  @override
  void dispose() {
    super.dispose();
    // _streamSubscription.cancel();
  }

  Future<void> listenSensor() async {
    FlutterError.onError = (FlutterErrorDetails details) {
      if (foundation.kDebugMode) {
        FlutterError.dumpErrorToConsole(details);
      }
    };
    // _streamSubscription = ProximitySensor.events.listen((int event) {
    //   setState(() {
    //     if (event < 1) {
    //       Navigator.pushNamed(context, "/logout");
    //     }
    //   });
    // });
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return SafeArea(
      child: Scaffold(
        drawer: const DrawerSlide(),
        appBar: AppBar(
          backgroundColor: Colors.white,
          leading: Builder(builder: (context) {
            return IconButton(
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
              icon: const Icon(
                Icons.menu,
                color: Colors.grey,
              ),
            );
          }),
          title: Row(
            children: [
              const SizedBox(width: 5),
              InkWell(
                onTap: () {},
                child: Container(
                  height: 46,
                  width: 220,
                  decoration: const BoxDecoration(
                    color: Colors.white70,
                  ),
                  child: const TextField(
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: 'Search . . . ',
                      hintStyle: TextStyle(color: Colors.black54),
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15),
              InkWell(
                onTap: () {},
                child: Container(
                  height: 46,
                  width: 20,
                  child: const TextField(
                    decoration: InputDecoration(icon: Icon(Icons.search)),
                  ),
                ),
              ),
            ],
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(bottom: 10),
                height: size.height * 0.25,
                decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/appbarimage.jpg'),
                      fit: BoxFit.fill,
                    ),
                    borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10))),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 10, left: 15),
                child: Row(
                  children: const [
                    Text('Categories',
                        style: TextStyle(
                            fontSize: 16, fontWeight: FontWeight.w500))
                  ],
                ),
              ),
              const SizedBox(height: 10),
              Consumer<GetCategory>(
                builder: (context, cate, _) {
                  if (cate.value?.isEmpty == true) {
                    cate.getCate(context);
                    return const Center(child: CircularProgressIndicator());
                  } else {
                    return ListView.builder(
                        physics: const BouncingScrollPhysics(),
                        shrinkWrap: true,
                        itemCount: cate.value?.length,
                        itemBuilder: (BuildContext context, int index) {
                          return Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: InkWell(
                              onTap: () => {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    fullscreenDialog: true,
                                    builder: (context) => Service(
                                      name:
                                          (cate.value?[index].cname).toString(),
                                      id: (cate.value?[index].id).toString(),
                                    ),
                                  ),
                                ),
                              },
                              child: Card(
                                elevation: 2,
                                child: Column(
                                  children: [
                                    Container(
                                      height: 150,
                                      width: double.infinity,
                                      decoration: BoxDecoration(
                                        color: Colors.purple.shade100,
                                        image: DecorationImage(
                                          fit: BoxFit.cover,
                                          image: NetworkImage(URL.main +
                                              "/" +
                                              "${cate.value?[index].cimage}"),
                                        ),
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.only(top: 5),
                                      child: SizedBox(
                                        height: 30,
                                        child: Text(
                                          (cate.value?[index].cname).toString(),
                                          style: TextStyle(
                                              fontSize: 18,
                                              color: Color(0xFFde8735)),
                                          textAlign: TextAlign.left,
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ),
                          );
                        });
                  }
                },
              ),
              // StreamBuilder<GyroscopeEvent>(
              //   stream: SensorsPlatform.instance.gyroscopeEvents,
              //   builder: (context, snapshot) {
              //     if (snapshot.hasData) {
              //       dx = dx + (snapshot.data!.y * 10);
              //       dy = dy + (snapshot.data!.x * 10);
              //       dz = dz + (snapshot.data!.z * 10);
              //     }
              //     if (dz >= 90.0) {
              //       MotionToast.success(
              //               description:
              //                   const Text('Successfully returned to Homepage'))
              //           .show(context);

              //       Navigator.push(
              //         context,
              //         MaterialPageRoute(
              //             fullscreenDialog: true,
              //             builder: (context) => const HomePage()),
              //       );
              //     }
              //     return Text("$dx\n$dy\n$dz");
              //   },
              // ),
            ],
          ),
        ),
      ),
    );
  }

  double dx = 100, dy = 100, dz = 100;
}
