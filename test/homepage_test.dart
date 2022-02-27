import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:touchofbeauty_flutter/screens/homepage.dart';

void main() {
  testWidgets("Testing Icon of appbar", (WidgetTester tester) async {
    var searchicon= (find.byIcon(Icons.search));
     await tester.pumpWidget(MaterialApp(
      home: HomePage(),
    ));
    expect(searchicon, findsWidgets);
  }); 
}
