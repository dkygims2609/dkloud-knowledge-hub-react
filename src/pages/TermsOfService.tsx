import { FileText, Users, Shield, AlertTriangle, Gavel, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our services.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Acceptance */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the dKloud Tech website (dkloud.in) and our services, you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our website or services. 
                These terms constitute a legally binding agreement between you and dKloud Tech.
              </p>
            </CardContent>
          </Card>

          {/* Services Description */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                dKloud Tech provides the following services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Content Curation:</strong> Movies, TV series, YouTube channels, and AI tools recommendations</li>
                <li><strong>Technical Resources:</strong> Tech SOPs, tutorials, and industry insights</li>
                <li><strong>Creative Services:</strong> Music composition, web development, and AI-powered design</li>
                <li><strong>Educational Content:</strong> Poetry, writing, and knowledge sharing</li>
                <li><strong>Technology Solutions:</strong> Cloud services and innovative tech implementations</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>User Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use our services for lawful purposes only</li>
                <li>Provide accurate and truthful information when contacting us</li>
                <li>Respect intellectual property rights of content creators</li>
                <li>Not attempt to reverse engineer, hack, or damage our systems</li>
                <li>Not use our services to distribute malicious content</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Content</h4>
                  <p className="text-muted-foreground">
                    All original content, design, code, and materials on this website are owned by dKloud Tech and protected by copyright laws.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Third-Party Content</h4>
                  <p className="text-muted-foreground">
                    We respect the intellectual property rights of others. All third-party content, links, and references are provided for 
                    educational and informational purposes. We encourage users to support original creators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <span>Limitations and Disclaimers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Our services are provided "as is" without warranties of any kind</li>
                <li>We do not guarantee the accuracy or completeness of third-party content</li>
                <li>Website availability may be subject to maintenance and technical issues</li>
                <li>External links are provided for convenience and we are not responsible for their content</li>
                <li>Service features and availability may change without prior notice</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Privacy and Data Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Our data collection and usage practices are governed by our Privacy Policy. 
                By using our services, you also agree to the terms outlined in our Privacy Policy. 
                We collect minimal data necessary to provide our services and improve user experience.
              </p>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link to="/privacy">View Privacy Policy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gavel className="h-5 w-5 text-primary" />
                <span>Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend access to our services at our sole discretion, without prior notice, 
                for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, 
                or for any other reason.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting 
                on this page. Your continued use of our services after changes are posted constitutes acceptance of the revised terms. 
                We encourage you to review these terms periodically.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> dileepkryadav09@gmail.com</p>
                <p><strong>Website:</strong> dkloud.in</p>
                <p><strong>Business Name:</strong> dKloud Tech</p>
                <p><strong>Location:</strong> India</p>
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

export default TermsOfService;