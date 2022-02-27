import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:touchofbeauty_flutter/models/loginclass.dart';
import 'package:touchofbeauty_flutter/screens/login_screen.dart';

void main() {
  testWidgets('Testing username and password fields', (WidgetTester tester) async {
    var textformfield = find.byType(TextFormField);
    await tester.pumpWidget(MaterialApp(
      home: LoginScreen(),
    ));
    expect(textformfield, findsWidgets);
  });
}


