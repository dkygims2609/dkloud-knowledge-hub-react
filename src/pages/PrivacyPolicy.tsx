import { Shield, Eye, Database, Lock, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is our priority. Learn how we protect your data.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Introduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                dKloud Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website dkloud.in and use our services. 
                By accessing our website, you consent to the data practices described in this policy.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Contact information (email address, phone number) when you reach out to us</li>
                  <li>Name and professional details when submitting service inquiries</li>
                  <li>Payment information when engaging our services (processed securely)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Automatically Collected Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>IP address, browser type, and operating system</li>
                  <li>Pages visited, time spent on our website, and referral sources</li>
                  <li>Device information and usage patterns</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To provide and maintain our services</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website functionality and user experience</li>
                <li>To send you updates about our services (with your consent)</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>Data Protection & Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>SSL encryption for data transmission</li>
                <li>Secure hosting infrastructure</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information by authorized personnel only</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website may contain links to third-party websites and services. We integrate with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Google Sheets API for dynamic content management</li>
                <li>External platforms for movie, TV, and tech content aggregation</li>
                <li>Social media platforms for sharing and connectivity</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We are not responsible for the privacy practices of these third-party services. We encourage you to review their privacy policies.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to the processing of your personal information</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> dileepkryadav09@gmail.com</p>
                <p><strong>Website:</strong> dkloud.in</p>
                <p><strong>Address:</strong> India</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="btn-gradient">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;