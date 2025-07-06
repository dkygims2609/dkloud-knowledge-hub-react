import { Scale, AlertCircle, ExternalLink, Info, BookOpen, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Disclaimer = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground">
            Important information about our website content and services.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* General Disclaimer */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-primary" />
                <span>General Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The information on this website (dkloud.in) is provided on an "as is" basis. To the fullest extent permitted by law, 
                dKloud Tech excludes all representations, warranties, obligations, and liabilities arising out of or in connection with this website.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Please note:</strong> This website serves as an educational and informational platform. 
                  We aggregate and curate content from various public sources for learning and discovery purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Disclaimer */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Content Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                  <Badge variant="outline">Movies & TV</Badge>
                </h4>
                <p className="text-muted-foreground text-sm">
                  All movie and TV series information is aggregated from publicly available sources. We do not host, store, or distribute copyrighted content. 
                  All recommendations are for educational and informational purposes.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                  <Badge variant="outline">AI Tools</Badge>
                </h4>
                <p className="text-muted-foreground text-sm">
                  AI tool recommendations are based on publicly available information. We are not affiliated with these tools unless explicitly stated. 
                  Users should evaluate tools independently before use.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                  <Badge variant="outline">Tech Resources</Badge>
                </h4>
                <p className="text-muted-foreground text-sm">
                  Technical guides and SOPs are provided for educational purposes. Implementation should be done with proper understanding and testing. 
                  We are not responsible for any technical issues arising from following our guides.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Links */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                <span>Third-Party Links and Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our website contains links to third-party websites, platforms, and services. These links are provided for convenience and informational purposes only.
                </p>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Important Notice</h5>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services.
                      </p>
                    </div>
                  </div>
                </div>
                
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>External streaming platforms and their content availability</li>
                  <li>AI tool providers and their terms of service</li>
                  <li>YouTube channels and their content policies</li>
                  <li>Social media platforms and their community guidelines</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Professional Services */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Professional Services Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  dKloud Tech offers various professional services including music composition, web development, and AI-powered design. 
                  For these services:
                </p>
                
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>All work is subject to separate service agreements and contracts</li>
                  <li>Deliverables and timelines are specified in individual project agreements</li>
                  <li>Intellectual property rights are governed by specific service contracts</li>
                  <li>Quality and satisfaction guarantees are outlined in service-specific terms</li>
                </ul>
                
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/services">View Our Services</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accuracy Disclaimer */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span>Accuracy and Currency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While we strive to keep information accurate and up-to-date, we make no representations or warranties about:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>The completeness, accuracy, or reliability of any information</li>
                <li>The availability of external services or platforms mentioned</li>
                <li>The currency of pricing information for recommended tools</li>
                <li>The ongoing functionality of linked resources</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In no event shall dKloud Tech be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Your use or inability to use our website or services</li>
                <li>Any conduct or content of any third party on or through our website</li>
                <li>Any content obtained from our website</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact for Clarifications */}
          <Card className="dkloud-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Questions or Clarifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this disclaimer or need clarification on any aspect of our services, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> dileepkryadav09@gmail.com</p>
                <p><strong>Website:</strong> dkloud.in</p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
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

export default Disclaimer;